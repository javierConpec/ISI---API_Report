import {getVentasPorFecha,getVentasPorProducto, getChartNozzleData,getFuelPoints, getAniosConVentas, getMesesConVentas} from "../repositories/chartRepository.js";

export const ventasPorFechaService = async (ano?: number, mes?: number) => {
    return await getVentasPorFecha(ano, mes);
}
export const ventasPorProductoService = async (ano?: number, mes?: number) => {
    return await getVentasPorProducto(ano, mes);
}

export const chartNozzleDataService = async (LogicalNumber?:number, ano?: number, mes?: number) => {
    return await getChartNozzleData(LogicalNumber,ano, mes);
}

export const fuelPointsService = async () => {
    return await getFuelPoints();
}

export const aniosConVentasService = async () => {
  return await getAniosConVentas();
};

export const mesesConVentasService = async (ano?: number) => {
  return await getMesesConVentas(ano);
};