import {getTotalAmount,getTotalHoy,getTotalNozzles,getTotalVolume} from "../repositories/cardRepository.js";

export const totalAmountService = async () => {
    return await getTotalAmount();
};

export const totalHoyService = async () => {
    return await getTotalHoy();
};

export const totalNozzlesService = async () => {
    return await getTotalNozzles();
};

export const totalVolumeService = async () => {
    return await getTotalVolume();
}; 

