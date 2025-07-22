import { Response,Request } from "express";
import { ReportGeneralService } from "../services/reporteService.js";

export const getReportGeneralController = async (req: Request, res:Response) => {
    try {
        const { fechaInicio, fechaFin, idProducto, manguera, puntoVenta } = req.query;
        const report = await ReportGeneralService(
            fechaInicio as string,
            fechaFin as string,
            idProducto ? parseInt(idProducto as string) : undefined,
            manguera ? parseInt(manguera as string) : undefined,
            puntoVenta ? parseInt(puntoVenta as string) : undefined
        );
        res.json(report);
    }catch (error) {
        console.error("Error fetching report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};