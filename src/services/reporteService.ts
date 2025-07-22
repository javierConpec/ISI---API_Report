import {getReportGeneral} from "../repositories/reporteRepository.js";

export const ReportGeneralService = async (
  fechaInicio?: string,
  fechaFin?: string,
  idProducto?: number,
  manguera?: number,
  puntoVenta?: number
) => {
  return await getReportGeneral(fechaInicio, fechaFin, idProducto, manguera, puntoVenta);
};