import { Request, Response } from "express";
import { saleService,saleByProductService,totalSaleService } from "../services/saleService.js";

export const saleReportController = async (req: Request, res: Response) => {
    try {
        const data = await saleService();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener el reporte de ventas:", error);
        res.status(500).json({ message: "Error al obtener el reporte de ventas" });
    }
}

export const saleByProductController = async (req: Request, res: Response) => {
    try {
        const data = await saleByProductService();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener las ventas por producto:", error);
        res.status(500).json({ message: "Error al obtener las ventas por producto" });
    }
};

export const totalSaleController = async (req: Request, res: Response) => {
    try {
        const data = await totalSaleService();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener el total de ventas:", error);
        res.status(500).json({ message: "Error al obtener el total de ventas" });
    }
};
