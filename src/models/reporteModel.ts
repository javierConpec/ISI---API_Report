export interface IReporteContometro {
    surtidor: number;
    productos: string;
    manguera: number;
    precio:number;
    cantidad: number;
    valor : number;
    contometro_inicial: number | null;
    contometro_final: number | null;
    consumo_real:number | null;
}

export interface IReporteTransacciones {
    Nro_Transaccion: number;
    fecha: string;
    Surtidor: number;
    Manguera: number;
    Producto: string;
    Cantidad: number;
    Precio: number;
    Total: number;
    Monto_Acumulado: number;
    Volumen_Acumulado: number;
    Fecha_Sincronizado : string;
}

export interface IReporteManguera {
    Lado : number;
    Manguera : number,
    Producto : string;
    precio : number;
    Total_Volume: number;
    Total_Monto: number;
    orden: number
}

export interface IReporteProducto {
    ID: number;
    Producto : string;
    Precio : number;
    Total_Volumen: number;
    Total_Monto : number;
}