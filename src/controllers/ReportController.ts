import { Response, Request } from "express";
import { ReporteContometroService } from "../services/reporteService.js";

export const getReporteContometroController = async (req: Request, res: Response) => {
  try {
    const { fecha, manguera, puntoVenta } = req.query;

    // Convertimos a string si existe, si no usamos la de hoy
    const fechaUsar = typeof fecha === "string" && fecha.trim() !== ""
      ? fecha
      : new Date().toISOString().slice(0, 10);

    const report = await ReporteContometroService(
      fechaUsar,
      typeof manguera === "string" ? Number(manguera) : undefined,
      typeof puntoVenta === "string" ? Number(puntoVenta) : undefined
    );

    res.json(report);
  } catch (error) {
    console.error("Error fetching reporte contometro:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
