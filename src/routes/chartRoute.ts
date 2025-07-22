import { Router } from "express";
import {ventasPorFechaController, ventasPorProductoController,chartNozzleDataController,fuelPointsController} from "../controllers/chartController.js"; 

export const chartRouter = Router();
chartRouter.get("/chart/ventasPorFecha", ventasPorFechaController);
chartRouter.get("/chart/ventasPorProducto", ventasPorProductoController);
chartRouter.get("/chart/chartNozzleData", chartNozzleDataController);
chartRouter.get("/chart/fuelPoints", fuelPointsController);