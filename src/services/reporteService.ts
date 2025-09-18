import { getReporteContometro, getReportTransactions, getReportNozzle,getReportProducts } from "../repositories/reporteRepository.js";

export const ReporteContometroService = async (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number,
  dateClose?: string,
) => {
  return await getReporteContometro(fechaInicio,fechaFin,horaInicio,horaFin, manguera, puntoVenta,dateClose);
};

export const ReporteTransaccionesService = async (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number,
  dateClose?: string,
) => {
  return await getReportTransactions(fechaInicio,fechaFin,horaInicio,horaFin, manguera, puntoVenta,dateClose);
}

export const ReportNozzleService = async (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number
) => {
    return await getReportNozzle(fechaInicio,fechaFin,horaInicio,horaFin, manguera, puntoVenta);
}

export const ReportProductService =async (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
)=> {
  return await getReportProducts(fechaInicio,fechaFin,horaInicio,horaFin);
}