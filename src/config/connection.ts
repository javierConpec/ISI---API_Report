import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

async function testConnection() {
  try {
    const conn = await connection.getConnection();
    console.log('Conectado a la BD con éxito :) japi');
    conn.release(); //Esto va Liberar la conexión del pool (buscar)
  } catch (error) {
    console.error('Error en la conexión con la BD :(', error);
  }
}

testConnection();

export default connection;

