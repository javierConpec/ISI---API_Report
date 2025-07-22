import {getVentasPorFecha,getVentasPorProducto, getChartNozzleData,getFuelPoints} from "../repositories/chartRepository.js";

export const ventasPorFechaService = async () => {
    return await getVentasPorFecha();
}

export const ventasPorProductoService = async () => {
    return await getVentasPorProducto();
}

export const chartNozzleDataService = async (fuelPointId?:number) => {
    return await getChartNozzleData(fuelPointId);
}

export const fuelPointsService = async () => {
    return await getFuelPoints();
}