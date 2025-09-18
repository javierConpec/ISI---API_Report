import { Request, Response } from "express";
import {filterbyNozzle,filterbyPoint, filterbyProduct,filterByTurnos} from "../services/filterReportService.js"

export const filterNozzleController = async (req:Request, res:Response) => {
    try{
        const fuelpointId = Number(req.query.fuelpointId);
        if (isNaN(fuelpointId)) {
            return res.status(400).json({ message: "No se encontro El surtidor" });
        }
        const data = await filterbyNozzle(fuelpointId);
        res .status(200).json(data)
    }catch (error) {
        console.error("Error al obtener las mangueras:", error);
        res.status(500).json({ message: "Error al obtener todas las mangueras" });
    }
}


export const filterPointController = async (req:Request, res:Response) => {
    try{
        const data = await filterbyPoint();
        res .status(200).json(data)
    }catch (error) {
        console.error("Error al obtener los puntos de venta:", error);
        res.status(500).json({ message: "Error al obtener todas los puntos de venta" });
    }
}



export const filterProductController = async (req:Request, res:Response) => {
    try{
        const data = await filterbyProduct();
        res .status(200).json(data)
    }catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ message: "Error al obtener todas las productos" });
    }
}


export const filterTurnosCloseController = async (req: Request, res: Response) => {
  try {
    const { fechaInicio, fechaFin } = req.query; // opcional

    const data = await filterByTurnos(
      fechaInicio as string | undefined,
      fechaFin as string | undefined
    );

    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener los cierres de turno:", error);
    res.status(500).json({ message: "Error al obtener los cierres de turno" });
  }
};

