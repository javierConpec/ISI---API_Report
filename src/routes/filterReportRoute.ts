import { Router } from "express";
import {filterNozzleController,filterPointController,filterProductController} from "../controllers/filterReportController.js"

export const filterReportRouter = Router();
filterReportRouter.get("/filter/Nozzle", filterNozzleController);
filterReportRouter.get("/filter/Point", filterPointController);
filterReportRouter.get("/filter/Product", filterProductController);