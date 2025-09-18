import connection from "../config/connection.js";
import { IDateCloseFilter, ImangueraFilter, IproductFilter, IpuntoVentaFlter } from "../models/filterModel.js";

export async function getNozzleFilter(fuelpointId: number): Promise<ImangueraFilter[]> {
  const [rows] = await connection.query(`
    SELECT id, NozzleNumber FROM Nozzles where FuelPointId=?;
  `, [fuelpointId]);
  return rows as ImangueraFilter[];
}

export async function getProductFilter(): Promise<IproductFilter[]> {
  const [rows] = await connection.query(`
    SELECT id, name FROM Products where active = 1;
  `);
  return rows as IproductFilter[];
}

export async function getPointFilter(): Promise<IpuntoVentaFlter[]> {
  const [rows] = await connection.query(`
    SELECT Id, LogicalNumber FROM FuelPoints;
  `);
  return rows as IpuntoVentaFlter[];
}

export async function getTurnos(fechaInicio?: string, fechaFin?: string): Promise<string[]> {
  const hoy = new Date().toISOString().slice(0, 10);

  // Si no pasas fechas, se usa hoy como inicio y fin
  const inicio = fechaInicio ?? hoy;
  const fin = fechaFin ?? inicio;

  const query = `
    SELECT DISTINCT 
      DATE_FORMAT(DateClose, '%Y/%m/%d %H:%i:%s') AS DateCloseFormatted
    FROM Transactions
    WHERE DateClose <> '0001-01-01 00:00:00'
      AND DATE(DateClose) BETWEEN ? AND ?
    ORDER BY DateCloseFormatted;
  `;

  const [rows] = await connection.query(query, [inicio, fin]);

  return Array.isArray(rows) ? (rows as { DateCloseFormatted: string }[]).map(r => r.DateCloseFormatted) : [];
}


