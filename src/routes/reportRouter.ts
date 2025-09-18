import { Router } from "express";
import { getReporteContometroController,getReporteTransaccionesController,getReportNozzleController,getReportProductController } from "../controllers/ReportController.js";

export const reportRouter = Router();
reportRouter.get("/report/contometro", getReporteContometroController);
reportRouter.get("/report/transacciones", getReporteTransaccionesController);
reportRouter.get("/report/mangueras", getReportNozzleController);
reportRouter.get("/report/productos", getReportProductController);
