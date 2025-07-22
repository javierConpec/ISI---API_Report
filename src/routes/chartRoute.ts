import { Router } from "express";
import {ventasPorFechaController} from "../controllers/chartController.js"; 

export const chartRouter = Router();
chartRouter.get("/chart/ventasPorFecha", ventasPorFechaController);