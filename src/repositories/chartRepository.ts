import connection from "../config/connection.js";
import { IVentaPorFecha } from "../models/chartModel.js";

export async function getVentasPorFecha(): Promise<IVentaPorFecha[]> {
    const [rows] = await connection.query(`
        SELECT 
            DATE(t.DateRegister) AS fecha, 
            p.Name AS producto, 
             SUM(t.Amount) AS total_vendido
        FROM transactions t
            INNER JOIN nozzles n ON t.NozzleId = n.Id
            INNER JOIN products p ON n.ProductId = p.Id
        GROUP BY DATE(t.DateRegister), p.Name
        ORDER BY fecha ASC;
    `);

    const result = Array.isArray(rows) ? rows : [];
    return result as IVentaPorFecha[];
}