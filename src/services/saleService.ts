import { getSaleByProduct, getSalesReport,getTotalSale } from "../repositories/saleRepository.js";

export const saleService = async () => {
    return await getSalesReport();
};

export const saleByProductService = async () => {
    return await getSaleByProduct();
};

export const totalSaleService = async () => {
    return await getTotalSale();
}