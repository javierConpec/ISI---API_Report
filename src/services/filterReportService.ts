import {getNozzleFilter,getPointFilter,getProductFilter} from "../repositories/fileterReportRepository.js"

export const filterbyNozzle = async (fuelpointId: number) => {
    return await getNozzleFilter(fuelpointId);
}

export const filterbyPoint = async () => {
    return await getPointFilter();
}

export const filterbyProduct = async () => {
    return await getProductFilter();
}