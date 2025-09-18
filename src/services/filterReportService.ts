import {getNozzleFilter,getPointFilter,getProductFilter,getTurnos} from "../repositories/fileterReportRepository.js"

export const filterbyNozzle = async (fuelpointId: number) => {
    return await getNozzleFilter(fuelpointId);
}

export const filterbyPoint = async () => {
    return await getPointFilter();
}

export const filterbyProduct = async () => {
    return await getProductFilter();
}

export const filterByTurnos = async (fechaInicio?: string, fechaFin?: string) => {
  return await getTurnos(fechaInicio, fechaFin);
};