import { Router } from "express";
import { getReportGeneralController } from "../controllers/ReportController.js";

export const reportRouter = Router();
reportRouter.get("/report/general", getReportGeneralController);
