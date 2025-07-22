import connection from "../config/connection.js";
import {IReporteGeneral} from "../models/reporteModel.js"
import { Request,Response } from "express";

export async function getReportGeneral(
  fechaInicio?: string,
  fechaFin?: string,
  idProducto?: number,
  manguera?: number,
  puntoVenta?: number
): Promise<IReporteGeneral[]> {
  let query = `
    SELECT 
      t.DateRegister AS fecha,
      p.InternalCode AS cod_producto,
      p.Name AS producto,
      n.NozzleNumber AS manguera,
      f.LogicalNumber AS punto_venta,
      t.UnitPrice AS precio,
      p.CurrentPrice AS precio_actual,
      t.Volume AS volumen,
      t.Amount AS total
    FROM transactions t
      INNER JOIN nozzles n ON t.NozzleId = n.Id
      INNER JOIN products p ON n.ProductId = p.Id
      INNER JOIN fuelpoints f ON n.FuelPointId = f.Id
    WHERE 1 = 1
  `;

  const params: any[] = [];

  if (fechaInicio) {
    query += ` AND t.DateRegister >= ?`;
    params.push(fechaInicio);
  }

  if (fechaFin) {
    query += ` AND t.DateRegister <= ?`;
    params.push(fechaFin + " 23:59:59");
  }

  if (idProducto) {
    query += ` AND p.Id = ?`;
    params.push(idProducto);
  }

  if (manguera) {
    query += ` AND n.NozzleNumber = ?`;
    params.push(manguera);
  }

  if (puntoVenta) {
    query += ` AND f.LogicalNumber = ?`;
    params.push(puntoVenta);
  }

  query += ` ORDER BY t.DateRegister DESC`;

  const [rows] = await connection.query(query, params);
  return Array.isArray(rows) ? (rows as IReporteGeneral[]) : [];
}