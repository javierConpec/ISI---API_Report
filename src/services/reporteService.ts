import { getReporteContometro } from "../repositories/reporteRepository.js";

export const ReporteContometroService = async (
  fecha: string,
  manguera?: number,
  puntoVenta?: number
) => {
  return await getReporteContometro(fecha, manguera, puntoVenta);
};
