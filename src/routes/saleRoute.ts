import { Router } from "express";
import { saleReportController, saleByProductController,totalSaleController } from "../controllers/saleController.js";

export const saleRouter = Router();
saleRouter.get("/sale/report", saleReportController);


export const saleByProductRouter = Router();
saleByProductRouter.get("/sale/saleByProduct", saleByProductController);

export const saleTotalRouter = Router();
saleByProductRouter.get("/sale/total", totalSaleController);


