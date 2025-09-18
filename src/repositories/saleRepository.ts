import connection from "../config/connection.js";
import { ProductbySale } from "../models/productModel.js";
import { ReporteVenta,totalSale } from "../models/saleModel.js";

export async function getSalesReport(): Promise<ReporteVenta[]> {
  const [rows] = await connection.query(`
        SELECT
        DATE(t.daTErEGISTER) AS fecha,
        P.Name AS producto,
        SUM(t.Amount) AS total_vendido
        FROM Transactions t
        JOIN Nozzles n ON t.NozzleId = n.Id 
        JOIN Products p ON n.ProductId = p.Id
        GROUP BY DATE(t.DateRegister), p.Name
        ORDER BY fecha ASC`);

  return rows as ReporteVenta[];
}

export async function getSaleByProduct(): Promise<ProductbySale[]> {
  const [rows] = await connection.query(`
        SELECT 
            p.Name AS producto,
            COALESCE(SUM(t.Amount), 0) AS total_vendido
        FROM Products p
            LEFT JOIN Nozzles n ON n.ProductId = p.Id
            LEFT JOIN Transactions t ON t.NozzleId = n.Id 
            WHERE p.Active=1
            GROUP BY p.Name
    ORDER BY total_vendido DESC;`);

  return rows as ProductbySale[];
}

export async function getTotalSale(): Promise<totalSale> {
  const [rows] = await connection.query(`
    SELECT COALESCE(SUM(Amount), 0) AS ventaTotal
    FROM Transactions ;
  `);

  const result = Array.isArray(rows) ? rows[0] : rows;
  return result as totalSale;
}
