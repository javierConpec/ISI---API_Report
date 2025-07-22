export interface IVentaPorFecha {
  fecha: string;     
  producto: string;      
  total_vendido: number; 
}

export interface IVentaPorProdcuto {
  producto: string;
  total_vendido: number;
}

export interface chartNozzle {
    nozzleNumber: number;
    fuelPoint: number;
    product: string;
    totalVolume: number;
}