import { Request, Response } from "express";
import { ventasPorFechaService, ventasPorProductoService,chartNozzleDataService, fuelPointsService } from "../services/chartService.js";

export const ventasPorFechaController = async (req: Request, res: Response) => {
    try {
        const data = await ventasPorFechaService();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener las ventas por fecha:", error);
        res.status(500).json({ message: "Error al obtener las ventas por fecha" });
    }
};

export const ventasPorProductoController = async (req: Request, res: Response) => {
    try {
        const data = await ventasPorProductoService();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener las ventas por producto:", error);
        res.status(500).json({ message: "Error al obtener las ventas por producto" });
    }
};

export const chartNozzleDataController = async (req: Request, res: Response) => {
  try {
    const fuelPointId = req.query.fuelPointId ? Number(req.query.fuelPointId) : undefined;
    const data = await chartNozzleDataService(fuelPointId); // ✅ Esto funciona
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener los datos de la manguera:", error);
    res.status(500).json({ message: "Error al obtener los datos de la manguera" });
  }
};

export const fuelPointsController = async (req: Request, res: Response) => {
    try {
        const data = await fuelPointsService();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los puntos de combustible:", error);
        res.status(500).json({ message: "Error al obtener los puntos de combustible" });
    }
}
