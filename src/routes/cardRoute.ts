import { Router } from "express";
import { totalAmountController, totalHoyController, totalNozzlesController, totalVolumeController } from "../controllers/cardController.js";

export const cardRouter = Router();
cardRouter.get("/card/totalAmount", totalAmountController);
cardRouter.get("/card/totalHoy", totalHoyController);
cardRouter.get("/card/totalNozzles", totalNozzlesController);
cardRouter.get("/card/totalVolume", totalVolumeController);
