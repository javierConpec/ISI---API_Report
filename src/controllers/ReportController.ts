import { Response, Request } from "express";
import { ReporteContometroService, ReporteTransaccionesService,ReportNozzleService,ReportProductService} from "../services/reporteService.js";

export const getReporteContometroController = async (req: Request, res: Response) => {
  try {
    const { fechaInicio, fechaFin, horaInicio, horaFin, manguera, puntoVenta, dateClose } = req.query;

    // Fechas
    const fechaIUsar =
      typeof fechaInicio === "string" && fechaInicio.trim() !== ""
        ? fechaInicio
        : new Date().toISOString().slice(0, 10);

    const fechaFUsar =
      typeof fechaFin === "string" && fechaFin.trim() !== ""
        ? fechaFin
        : fechaIUsar;

    // Horas
    const horaInicioUsar =
      typeof horaInicio === "string" && horaInicio.trim() !== "" ? horaInicio : "00:00:00";
    const horaFinUsar =
      typeof horaFin === "string" && horaFin.trim() !== "" ? horaFin : "23:59:59";

    const report = await ReporteContometroService(
      fechaIUsar,
      fechaFUsar,
      horaInicioUsar,
      horaFinUsar,
      typeof manguera === "string" ? Number(manguera) : undefined,
      typeof puntoVenta === "string" ? Number(puntoVenta) : undefined,
      typeof dateClose === "string" ? dateClose : undefined
    );

    res.json(report);
  } catch (error) {
    console.error("Error fetching reporte contometro:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getReporteTransaccionesController = async (req: Request, res: Response) => {
  try {
    const { fechaInicio, fechaFin, horaInicio, horaFin, manguera, puntoVenta, dateClose } = req.query;

    // Fechas
    const fechaIUsar =
      typeof fechaInicio === "string" && fechaInicio.trim() !== ""
        ? fechaInicio
        : new Date().toISOString().slice(0, 10);

    const fechaFUsar =
      typeof fechaFin === "string" && fechaFin.trim() !== ""
        ? fechaFin
        : fechaIUsar;

    // Horas
    const horaInicioUsar =
      typeof horaInicio === "string" && horaInicio.trim() !== "" ? horaInicio : "00:00:00";
    const horaFinUsar =
      typeof horaFin === "string" && horaFin.trim() !== "" ? horaFin : "23:59:59";

    const report = await ReporteTransaccionesService(
      fechaIUsar,
      fechaFUsar,
      horaInicioUsar,
      horaFinUsar,
      typeof manguera === "string" ? Number(manguera) : undefined,
      typeof puntoVenta === "string" ? Number(puntoVenta) : undefined,
      typeof dateClose === "string" ? dateClose : undefined
    );

    res.json(report);
  } catch (error) {
    console.error("Error fetching reporte transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getReportNozzleController = async (req: Request, res: Response) =>{
  try{
    const { fechaInicio, fechaFin, horaInicio, horaFin, manguera, puntoVenta } = req.query;
    // Fechas
    const fechaIUsar =
      typeof fechaInicio === "string" && fechaInicio.trim() !== ""
        ? fechaInicio
        : new Date().toISOString().slice(0, 10);

    const fechaFUsar =
      typeof fechaFin === "string" && fechaFin.trim() !== ""
        ? fechaFin
        : fechaIUsar;

    // Horas
    const horaInicioUsar =
      typeof horaInicio === "string" && horaInicio.trim() !== "" ? horaInicio : "00:00:00";
    const horaFinUsar =
      typeof horaFin === "string" && horaFin.trim() !== "" ? horaFin : "23:59:59";

    const report = await ReportNozzleService(
      fechaIUsar,
      fechaFUsar,
      horaInicioUsar,
      horaFinUsar,
      typeof manguera === "string" ? Number(manguera) : undefined,
      typeof puntoVenta === "string" ? Number(puntoVenta) : undefined
    );
   res.json(report);
  } catch (error) {
    console.error("Error fetching reporte nozzle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getReportProductController = async (req: Request, res: Response) => {
  try {
    const { fechaInicio, fechaFin, horaInicio, horaFin} = req.query;

    const report = await ReportProductService(
      typeof fechaInicio === "string" && fechaInicio.trim() !== "" ? fechaInicio : undefined,
      typeof fechaFin === "string" && fechaFin.trim() !== "" ? fechaFin : undefined,
      typeof horaInicio === "string" && horaInicio.trim() !== "" ? horaInicio : undefined,
      typeof horaFin === "string" && horaFin.trim() !== "" ? horaFin : undefined,
    );

    res.json(report);
  } catch (error) {
    console.error("Error fetching reporte products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
