import { IReporteTransacciones } from "../models/reporteModel.js";
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

export const ReporteTransaccionesConIAService = async (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number,
  dateClose?: string
) => {
  const data: IReporteTransacciones[] = await getReportTransactions(
    fechaInicio,
    fechaFin,
    horaInicio,
    horaFin,
    manguera,
    puntoVenta,
    dateClose
  );

  const prompt = `
    Analiza estos datos de ventas de combustible:
    ${JSON.stringify(data)}
    Resume tendencias, picos y crecimiento porcentual por manguera.
    Devuelve máximo 3 frases claras.
  `;

  return { data, prompt };
};

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