import { Request, Response } from "express";
import { totalAmountService, totalHoyService,totalNozzlesService,totalVolumeService} from "../services/cardService.js";   

export const totalAmountController = async (req: Request, res: Response) => {
    try {
        const data = await totalAmountService();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener el monto total:", error);
        res.status(500).json({ message: "Error al obtener el monto total" });
    }
};

export const totalHoyController = async (req: Request, res: Response) => {
    try {
        const data = await totalHoyService();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener el total de hoy:", error);
        res.status(500).json({ message: "Error al obtener el total de hoy" });
    }
};

export const totalNozzlesController = async (req: Request, res: Response) => {
    try {
        const data = await totalNozzlesService();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener el total de boquillas:", error);
        res.status(500).json({ message: "Error al obtener el total de boquillas" });
    }
};

export const totalVolumeController = async (req: Request, res: Response) => {
    try {
        const data = await totalVolumeService();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener el volumen total:", error);
        res.status(500).json({ message: "Error al obtener el volumen total" });
    }
};