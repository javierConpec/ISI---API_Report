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
