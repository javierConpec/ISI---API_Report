import connection from "../config/connection.js";
import { ImangueraFilter, IproductFilter, IpuntoVentaFlter } from "../models/filterModel.js";

export async function getNozzleFilter(fuelpointId: number): Promise<ImangueraFilter[]> {
  const [rows] = await connection.query(`
    SELECT id, NozzleNumber FROM nozzles where FuelPointId=?;
  `, [fuelpointId]);
  return rows as ImangueraFilter[];
}

export async function getProductFilter(): Promise<IproductFilter[]> {
  const [rows] = await connection.query(`
    SELECT id, name FROM products where active = 1;
  `);
  return rows as IproductFilter[];
}

export async function getPointFilter(): Promise<IpuntoVentaFlter[]> {
  const [rows] = await connection.query(`
    SELECT Id, LogicalNumber FROM fuelpoints;
  `);
  return rows as IpuntoVentaFlter[];
}
