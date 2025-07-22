import express from 'express';
import cors from "cors";
import { saleRouter,saleByProductRouter,saleTotalRouter } from './routes/saleRoute.js'; 

const app = express();
app.use(cors()); 
app.use(express.json());

// Rutas :)
app.use('/api', saleRouter);
app.use('/api', saleByProductRouter);
app.use('/api', saleTotalRouter);

export default app;