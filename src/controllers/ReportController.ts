import { Response, Request } from "express";
import { ReporteContometroService, ReporteTransaccionesConIAService, ReporteTransaccionesService,ReportNozzleService,ReportProductService} from "../services/reporteService.js";
import OpenAI from 'openai';

// Configuración del cliente OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


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

export const getReporteTransaccionesConIA = async (req: Request, res: Response) => {
  try {
    const { fechaInicio, fechaFin, horaInicio, horaFin, manguera, puntoVenta, dateClose } = req.query;

    // 1️Traemos los datos y el prompt desde el service
    const { data, prompt } = await ReporteTransaccionesConIAService(
      fechaInicio as string,
      fechaFin as string,
      horaInicio as string,
      horaFin as string,
      manguera ? Number(manguera) : undefined,
      puntoVenta ? Number(puntoVenta) : undefined,
      dateClose as string
    );

    // 2️ Llamamos a OpenAI con el prompt
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const insight = completion.choices[0].message?.content || "No se pudo generar insight";

    // 3️ Retornamos los datos y el insight al frontend
    res.json({ data, insight });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando reporte con IA" });
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
