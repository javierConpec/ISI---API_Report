import connection from "../config/connection.js";
import {IReporteContometro} from "../models/reporteModel.js"


export async function getReporteContometro(
  fechaInicio?: string,
  manguera?: number,
  puntoVenta?: number
): Promise<IReporteContometro[]> {
  // Si no envían fecha, usar la fecha actual 
  const fecha = fechaInicio ?? new Date().toISOString().slice(0, 10);

  let query = `
    SELECT 
        f.LogicalNumber AS surtidor,
        p.Name AS producto, 
        n.NozzleNumber AS manguera, 
        p.CurrentPrice AS precio, 
        SUM(t.Volume) AS cantidad, 
        SUM(t.Amount) AS valor,
        MAX(CASE WHEN DATE(t2.DateRegister) = DATE_SUB(?, INTERVAL 1 DAY) 
                THEN t2.TotalDispensedVolume END) AS contometroInicial,
        MAX(CASE WHEN DATE(t2.DateRegister) = ? 
                THEN t2.TotalDispensedVolume END) AS contometroFinal,
        MAX(CASE WHEN DATE(t2.DateRegister) = ? 
                THEN t2.TotalDispensedVolume END)
        - MAX(CASE WHEN DATE(t2.DateRegister) = DATE_SUB(?, INTERVAL 1 DAY) 
                THEN t2.TotalDispensedVolume END) AS consumoReal
    FROM transactions t
    INNER JOIN fuelPoints f 
        ON f.Id = t.FuelPointId
    INNER JOIN nozzles n 
        ON n.Id = t.NozzleId
    INNER JOIN products p 
        ON p.Id = n.ProductId
    LEFT JOIN transactions t2
        ON t2.FuelPointId = t.FuelPointId
        AND t2.NozzleId = t.NozzleId
        AND (
            DATE(t2.DateRegister) = ? 
            OR DATE(t2.DateRegister) = DATE_SUB(?, INTERVAL 1 DAY)
        )
    WHERE DATE(t.DateRegister) = ?
  `;
  const params: any[] = [
    //Es una mejor práctica usar parámetros para evitar inyecciones SQL aunq podriamos añadir esto ( multipleStatements: true) en connection pero es mas riesgoso 
    fechaInicio, // DATE_SUB 1
    fechaInicio, // MAX final
    fechaInicio, // MAX final
    fechaInicio, // DATE_SUB 2
    fechaInicio, // LEFT JOIN fecha
    fechaInicio, // LEFT JOIN DATE_SUB
    fechaInicio  // WHERE fecha
  ];

  if (manguera) {
    query += ` AND n.NozzleNumber = ?`;
    params.push(manguera);
  }

  if (puntoVenta) {
    query += ` AND f.LogicalNumber = ?`;
    params.push(puntoVenta);
  }

  query += `
    GROUP BY surtidor, producto, manguera, precio
    ORDER BY surtidor, manguera
  `;

  const [rows] = await connection.query(query, params);
  return Array.isArray(rows) ? (rows as IReporteContometro[]) : [];
}