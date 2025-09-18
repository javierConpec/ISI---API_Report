import connection from "../config/connection.js";
import {IVentaPorFecha,IVentaPorProdcuto,chartNozzle,} from "../models/chartModel.js";

export async function getVentasPorFecha(
  ano?: number,
  mes?: number
): Promise<IVentaPorFecha[]> {
  let conditions = "WHERE 1=1 ";
  const params: any[] = [];

  //  Si no se pasa ni año ni mes → usar mes y año actual
  if (ano === undefined && mes === undefined) {
    conditions += "AND YEAR(t.DateRegister) = YEAR(CURDATE()) ";
    conditions += "AND MONTH(t.DateRegister) = MONTH(CURDATE()) ";
  } else {
    if (ano !== undefined) {
      conditions += "AND YEAR(t.DateRegister) = ? ";
      params.push(ano);
    }
    if (mes !== undefined) {
      conditions += "AND MONTH(t.DateRegister) = ? ";
      params.push(mes);
    }
  }

  const query = `
    SELECT 
      DATE(t.DateRegister) AS fecha,
      p.Name AS producto,
      SUM(t.Volume) AS total_vendido
    FROM Transactions t
    INNER JOIN Nozzles n 
        ON t.NozzleId = n.NozzleNumber 
       AND t.FuelPointId = n.FuelPointId
    INNER JOIN Products p 
        ON n.ProductId = p.Id
    ${conditions}
    GROUP BY DATE(t.DateRegister), p.Name
    ORDER BY fecha ASC;
  `;

  const [rows] = await connection.query(query, params);
  return Array.isArray(rows) ? (rows as IVentaPorFecha[]) : [];
}



export async function getVentasPorProducto(ano?: number, mes?: number): Promise<IVentaPorProdcuto[]> {
  let conditions = "WHERE p.Active = 1 ";
  const params: any[] = [];

  if (ano !== undefined) {
    conditions += "AND YEAR(t.DateRegister) = ? ";
    params.push(ano);
  }

  if (mes !== undefined) {
    conditions += "AND MONTH(t.DateRegister) = ? ";
    params.push(mes);
  }

  const query = `
    SELECT 
      p.Name AS producto,
      COALESCE(SUM(t.Amount), 0) AS total_vendido
    FROM Products p
    LEFT JOIN Nozzles n ON n.ProductId = p.Id
    LEFT JOIN Transactions t ON t.NozzleId = n.NozzleNumber
    ${conditions}
    GROUP BY p.Name
    ORDER BY total_vendido DESC;
  `;

  const [rows] = await connection.query(query, params);
  return Array.isArray(rows) ? (rows as IVentaPorProdcuto[]) : [];
}


export async function getChartNozzleData(
  LogicalNumber?: number,
  ano?: number,
  mes?: number
): Promise<chartNozzle[]> {
  let query = "";
  const params: any[] = [];

  // Si no pasan año/mes, usar los actuales
  const now = new Date();
  const anoFiltro = ano ?? now.getFullYear();
  const mesFiltro = mes ?? now.getMonth() + 1; // getMonth() empieza en 0

  if (LogicalNumber !== undefined) {
    // Detalle por mangueras de un surtidor
    query = `
      SELECT 
        n.NozzleNumber AS Manguera, 
        f.LogicalNumber AS Surtidor, 
        p.Name AS Producto, 
        SUM(t.Volume) AS Volumen
      FROM Transactions t
      INNER JOIN FuelPoints f ON t.FuelPointId = f.Id
      INNER JOIN Nozzles n ON n.FuelPointId = f.Id AND n.NozzleNumber = t.NozzleId
      INNER JOIN Products p ON p.Id = n.ProductId
      WHERE f.LogicalNumber = ?
        AND t.Volume > 0
        AND YEAR(t.DateRegister) = ?
        AND MONTH(t.DateRegister) = ?
      GROUP BY n.NozzleNumber, f.LogicalNumber, p.Name
      ORDER BY Manguera, Surtidor;
    `;
    params.push(LogicalNumber, anoFiltro, mesFiltro);
  } else {
    // Totales por surtidor
    query = `
      SELECT 
        f.LogicalNumber AS Surtidor,
        SUM(t.Volume) AS Volumen
      FROM Transactions t
      INNER JOIN FuelPoints f ON t.FuelPointId = f.Id
      WHERE t.Volume > 0
        AND YEAR(t.DateRegister) = ?
        AND MONTH(t.DateRegister) = ?
      GROUP BY f.LogicalNumber
      ORDER BY Surtidor;
    `;
    params.push(anoFiltro, mesFiltro);
  }

  const [rows] = await connection.query(query, params);
  return Array.isArray(rows) ? (rows as chartNozzle[]) : [];
}


export async function getFuelPoints(): Promise<number[]> {
  const [rows]: any[] = await connection.query(`
    SELECT DISTINCT f.LogicalNumber
    FROM Transactions t 
    join FuelPoints f on f.LogicalNumber=t.FuelPointId 
    ORDER BY f.LogicalNumber;
  `);
  return (Array.isArray(rows) ? rows : []).map((r: any) => r.LogicalNumber);
}

//OBTENER LOS ANOS Y MESE DONDE HUBO VENTAS
export async function getAniosConVentas(): Promise<number[]> {
  const [rows] = await connection.query(`
    SELECT DISTINCT YEAR(DateRegister) AS anio
    FROM Transactions
    ORDER BY anio ASC
  `);

  return Array.isArray(rows) ? rows.map((r: any) => r.anio) : [];
}

export async function getMesesConVentas(ano?: number): Promise<number[]> {
  const params: any[] = [];
  let condition = "";

  if (ano) {
    condition = "WHERE YEAR(DateRegister) = ?";
    params.push(ano);
  }

  const [rows] = await connection.query(`
    SELECT DISTINCT MONTH(DateRegister) AS mes
    FROM Transactions
    ${condition}
    ORDER BY mes ASC
  `);

  return Array.isArray(rows) ? rows.map((r: any) => r.mes) : [];
}
