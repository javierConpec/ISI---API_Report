import { Request, Response } from "express";
import { ventasPorFechaService, ventasPorProductoService,chartNozzleDataService, fuelPointsService, aniosConVentasService, mesesConVentasService } from "../services/chartService.js";

export const ventasPorFechaController = async (req: Request, res: Response) => {
  try {
    // Leer año y mes desde query params
    const ano = req.query.ano ? Number(req.query.ano) : undefined;
    const mes = req.query.mes ? Number(req.query.mes) : undefined;

    // Llamar al service con los filtros
    const data = await ventasPorFechaService(ano, mes);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener las ventas por fecha:", error);
    res.status(500).json({ message: "Error al obtener las ventas por fecha" });
  }
};


export const ventasPorProductoController = async (req: Request, res: Response) => {
  try {
    // Si no se pasa año/mes, usar el actual
    const now = new Date();
    const ano = req.query.ano ? Number(req.query.ano) : now.getFullYear();
    const mes = req.query.mes ? Number(req.query.mes) : now.getMonth() + 1; // getMonth() empieza en 0

    // Llamar al service con los filtros
    const data = await ventasPorProductoService(ano, mes);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener las ventas por producto:", error);
    res.status(500).json({ message: "Error al obtener las ventas por producto" });
  }
};


export const chartNozzleDataController = async (req: Request, res: Response) => {
  try {
    const LogicalNumber = req.query.LogicalNumber ? Number(req.query.LogicalNumber) : undefined;
    const ano = req.query.ano ? Number(req.query.ano) : undefined;
    const mes = req.query.mes ? Number(req.query.mes) : undefined;

    const data = await chartNozzleDataService(LogicalNumber,ano,mes); 
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


export const aniosConVentasController = async (req: Request, res: Response) => {
  try {
    const data = await aniosConVentasService();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json([]);
  }
};

export const mesesConVentasController = async (req: Request, res: Response) => {
  try {
    const ano = req.query.ano ? Number(req.query.ano) : undefined;
    const data = await mesesConVentasService(ano);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json([]);
  }
};
