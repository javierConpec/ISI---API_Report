import express from 'express';
import cors from "cors";
import { saleRouter,saleByProductRouter,saleTotalRouter } from './routes/saleRoute.js'; 
import { cardRouter } from './routes/cardRoute.js';
import { chartRouter } from './routes/chartRoute.js';
import { reportRouter } from './routes/reportRouter.js';
import {filterReportRouter} from './routes/filterReportRoute.js'

const app = express();
app.use(cors()); 
app.use(express.json());

// Rutas :)

app.use('/api', saleRouter);
app.use('/api', saleByProductRouter);
app.use('/api', saleTotalRouter);

// Card routes
app.use('/api', cardRouter);

// Chart routes
app.use('/api', chartRouter);

//Reporte routes
app.use('/api', reportRouter);
app.use('/api',filterReportRouter)

export default app;