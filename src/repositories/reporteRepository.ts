import connection from "../config/connection.js";
import {
  IReporteContometro,
  IReporteTransacciones,
  IReporteManguera,
  IReporteProducto,
} from "../models/reporteModel.js";

export async function getReporteContometro(
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number,  
  dateClose?: string 
): Promise<IReporteContometro[]> {
  const hoy = new Date().toISOString().slice(0, 10);
  const fechaI = fechaInicio ?? hoy;
  const fechaF = fechaFin ?? fechaI;
  const hInicio = horaInicio ?? "00:00:00";
  const hFin = horaFin ?? "23:59:59";

  const fechaHoraI = `${fechaI} ${hInicio}`;
  const fechaHoraF = `${fechaF} ${hFin}`;

  //aca pondremos los parametro spara el procedimiento almacenado

  const params = [
  fechaHoraI || null,
  fechaHoraF || null,
  hInicio || null,
  hFin || null,
  manguera || null,
  puntoVenta || null,
  dateClose || null,
];


  const [rows] = await connection.query("CALL GetReporteContometro(?, ?, ?, ?, ?, ?, ?)", params);
  return Array.isArray(rows) && Array.isArray(rows[0]) ? (rows[0] as IReporteContometro[]) : [];
  
}


export async function getReportTransactions(
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number,
  dateClose?: string
): Promise<IReporteTransacciones[]> {
    const hoy = new Date().toISOString().slice(0, 10);
  const fechaI = fechaInicio ?? hoy;
  const fechaF = fechaFin ?? fechaI;
  const hInicio = horaInicio ?? "00:00:00";
  const hFin = horaFin ?? "23:59:59";

  const fechaHoraI = `${fechaI} ${hInicio}`;
  const fechaHoraF = `${fechaF} ${hFin}`;

  //aca pondremos los parametro spara el procedimiento almacenado

  const params = [
  fechaHoraI || null,
  fechaHoraF || null,
  hInicio || null,
  hFin || null,
  manguera || null,
  puntoVenta || null,
  dateClose || null,
];
const [rows] = await connection.query("CALL GetReporteTransacciones(?, ?, ?, ?, ?, ?, ?)", params);
  return Array.isArray(rows) && Array.isArray(rows[0]) ? (rows[0] as IReporteTransacciones[]) : [];
  
}


export async function getReportNozzle(
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number,
  dateClose?: string
): Promise<IReporteManguera[]> {
  const hoy = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const fechaI = fechaInicio ?? hoy;
  const fechaF = fechaFin ?? fechaI;
  const hInicio = horaInicio ?? "00:00:00";
  const hFin = horaFin ?? "23:59:59";

  const params: any[] = [];
  let dateFilter = "";

  if (dateClose) {
    // si pasas fechas de cierre
    dateFilter = `AND DATE(t.DateClose) = ?`;
    params.push(dateClose);
  } else {
    // por defecto, rango en DateRegister
    dateFilter = `AND t.DateRegister BETWEEN CONCAT(?, ' ', ?) AND CONCAT(?, ' ', ?)`;
    params.push(fechaI, hInicio, fechaF, hFin);
  }

  if (puntoVenta != null) {
    dateFilter += ` AND f.LogicalNumber = ?`;
    params.push(puntoVenta);
  }

  if (manguera != null) {
    dateFilter += ` AND n.NozzleNumber = ?`;
    params.push(manguera);
  }

  const query = `
  WITH T1 AS (
    SELECT
      f.LogicalNumber AS Lado,
      n.NozzleNumber  AS Manguera,
      p.Name          AS Producto,
      p.CurrentPrice  AS Precio,
      COALESCE(SUM(t.Volume), 0) AS Total_Volumen,
      COALESCE(SUM(t.Amount), 0) AS Total_Monto,
      DATE(t.DateRegister) AS Fecha
    FROM FuelPoints f 
    INNER JOIN Nozzles n ON f.Id = n.FuelPointId
    INNER JOIN Products p ON p.Id = n.ProductId
    LEFT JOIN Transactions t 
      ON n.FuelPointId = t.FuelPointId
     AND n.NozzleNumber = t.NozzleId
    WHERE 1=1
      ${dateFilter}
    GROUP BY f.LogicalNumber, n.NozzleNumber, p.Name, p.CurrentPrice, DATE(t.DateRegister)
  )
  SELECT Lado, Manguera, Producto, Precio, Total_Volumen, Total_Monto, 1 AS orden, Fecha
  FROM T1
  UNION ALL
  SELECT Lado, NULL, 'TOTAL SURTIDOR', NULL, SUM(Total_Volumen), SUM(Total_Monto), 2, NULL as Fecha
  FROM T1
  GROUP BY Lado
  ORDER BY Lado, orden, Manguera;
  `;

  const [rows] = await connection.query(query, params);
  return Array.isArray(rows) ? (rows as IReporteManguera[]) : [];
}

export async function getReportProducts(
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number,
  dateClose?: string
): Promise<IReporteProducto[]> {
  const hoy = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const fechaI = fechaInicio ?? hoy;
  const fechaF = fechaFin ?? fechaI;
  const hInicio = horaInicio ?? "00:00:00";
  const hFin = horaFin ?? "23:59:59";

  const params: any[] = [];
  let dateFilter = "";

  if (dateClose) {
    dateFilter = `AND DATE(t.DateClose) = ?`;
    params.push(dateClose);
  } else {
    dateFilter = `AND t.DateRegister BETWEEN CONCAT(?, ' ', ?) AND CONCAT(?, ' ', ?)`;
    params.push(fechaI, hInicio, fechaF, hFin);
  }

  if (puntoVenta != null) {
    dateFilter += ` AND n.FuelPointId = ?`;
    params.push(puntoVenta);
  }

  if (manguera != null) {
    dateFilter += ` AND n.NozzleNumber = ?`;
    params.push(manguera);
  }

  const query = `
  WITH T1 AS (
    SELECT 
      p.Id AS ID,
      p.Name AS Producto,
      p.CurrentPrice AS Precio,
      COALESCE(SUM(t.Volume), 0) AS Total_Volumen,
      COALESCE(SUM(t.Amount), 0) AS Total_Monto,
      DATE(t.DateRegister) AS Fecha
    FROM Products p 
    LEFT JOIN Nozzles n ON n.ProductId = p.Id
    LEFT JOIN Transactions t 
           ON t.FuelPointId = n.FuelPointId
          AND t.NozzleId = n.NozzleNumber
    WHERE p.Active = 1
      ${dateFilter}
    GROUP BY p.Id, p.Name, p.CurrentPrice, DATE(t.DateRegister)
  )
  SELECT ID, Producto, Precio, Total_Volumen, Total_Monto, Fecha 
  FROM T1
  UNION ALL 
  SELECT 
    NULL AS ID,
    'TOTAL GENERAL' AS Producto,
    NULL AS Precio,
    COALESCE(SUM(Total_Volumen), 0),
    COALESCE(SUM(Total_Monto), 0),
    NULL AS Fecha  
  FROM T1;
  `;

  const [rows] = await connection.query(query, params);
  return Array.isArray(rows) ? (rows as IReporteProducto[]) : [];
}
