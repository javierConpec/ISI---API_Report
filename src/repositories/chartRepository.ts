import connection from "../config/connection.js";
import {
  IVentaPorFecha,
  IVentaPorProdcuto,
  chartNozzle,
} from "../models/chartModel.js";

export async function getVentasPorFecha(): Promise<IVentaPorFecha[]> {
  const [rows] = await connection.query(`
        SELECT 
            DATE(t.DateRegister) AS fecha, 
            p.Name AS producto, 
             SUM(t.Volume) AS total_vendido
        FROM transactions t
            INNER JOIN nozzles n ON t.NozzleId = n.Id
            INNER JOIN products p ON n.ProductId = p.Id
        GROUP BY DATE(t.DateRegister), p.Name
        ORDER BY fecha ASC;
    `);

  const result = Array.isArray(rows) ? rows : [];
  return result as IVentaPorFecha[];
}

export async function getVentasPorProducto(): Promise<IVentaPorProdcuto[]> {
  const [rows] = await connection.query(`
        SELECT 
            p.Name AS producto,
            COALESCE(SUM(t.Amount), 0) AS total_vendido
        FROM products p
            LEFT JOIN nozzles n ON n.ProductId = p.Id
            LEFT JOIN transactions t ON t.NozzleId = n.Id where p.Active=1
        GROUP BY p.Name
        ORDER BY total_vendido DESC;
    `);

  const result = Array.isArray(rows) ? rows : [];
  return result as IVentaPorProdcuto[];
}

export async function getChartNozzleData(fuelPointId?: number): Promise<chartNozzle[]> {
  let query = `
    SELECT 
      n.NozzleNumber as Manguera, 
      t.FuelPointId as Cara, 
      p.Name as Producto, 
      SUM(t.Volume) as Volumen 
    FROM transactions t
      INNER JOIN nozzles n ON t.NozzleId = n.Id
      INNER JOIN products p ON n.ProductId = p.Id
      INNER JOIN fuelpoints f ON n.FuelPointId = f.Id
  `;

  const params: any[] = [];

  if (fuelPointId !== undefined) {
    query += ` WHERE t.FuelPointId = ? `;
    params.push(fuelPointId);
  }

  query += ` GROUP BY n.NozzleNumber, t.FuelPointId, p.Name ORDER BY Manguera, Cara;`;

  const [rows] = await connection.query(query, params);
  return Array.isArray(rows) ? (rows as chartNozzle[]) : [];
}


export async function getFuelPoints(): Promise<number[]> {
  const [rows]: any[] = await connection.query(`
    SELECT DISTINCT FuelPointId FROM transactions ORDER BY FuelPointId;
  `);
  return (Array.isArray(rows) ? rows : []).map((r: any) => r.FuelPointId);
}
