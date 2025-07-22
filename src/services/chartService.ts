import {getVentasPorFecha} from "../repositories/chartRepository.js";

export const ventasPorFechaService = async () => {
    return await getVentasPorFecha();
}