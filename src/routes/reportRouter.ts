import { Router } from "express";
import { getReporteContometroController } from "../controllers/ReportController.js";

export const reportRouter = Router();
reportRouter.get("/report/contometro", getReporteContometroController);
