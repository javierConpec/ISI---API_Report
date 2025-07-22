import { Request, Response } from "express";
import { ventasPorFechaService } from "../services/chartService.js";

export const ventasPorFechaController = async (req: Request, res: Response) => {
    try {
        const data = await ventasPorFechaService();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener las ventas por fecha:", error);
        res.status(500).json({ message: "Error al obtener las ventas por fecha" });
    }
};