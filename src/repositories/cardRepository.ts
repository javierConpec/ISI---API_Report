import connection from "../config/connection.js";
import { ItotalAmount,ItotalHoy,ItotalNozzles,ItotalVolume } from "../models/cardsModels.js";

export async function getTotalAmount(): Promise<ItotalAmount> {
    const [rows] = await connection.query(`
        SELECT SUM(Amount) AS totalAmount FROM Transactions;
    `);

    const result = Array.isArray(rows) ? rows[0] : rows;
    return result as ItotalAmount;
}

export async function getTotalHoy(): Promise<ItotalHoy> {
    const [rows] = await connection.query(`
        SELECT SUM(Amount) AS totalHoy
        FROM Transactions
            WHERE DATE(DateRegister) = CURDATE();
    `);

    const result = Array.isArray(rows) ? rows[0] : rows;
    return result as ItotalHoy;
}

export async function getTotalNozzles(): Promise<ItotalNozzles> {
    const [rows] = await connection.query(`
        SELECT COUNT(*) AS totalNozzles
        FROM Nozzles;
    `);

    const result = Array.isArray(rows) ? rows[0] : rows;
    return result as ItotalNozzles;
}

export async function getTotalVolume(): Promise<ItotalVolume> {
    const [rows] = await connection.query(`
        SELECT SUM(Volume) AS totalVolume FROM Transactions;
    `);

    const result = Array.isArray(rows) ? rows[0] : rows;
    return result as ItotalVolume;
}