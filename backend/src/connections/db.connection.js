import mysql from 'mysql2/promise';
import { dbConfig } from './config.connection.js';

const db = mysql.createPool(dbConfig);

async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log('Connected to MySQL database!');
        connection.release();
    } catch (err) {
        console.error('MySQL Connection Error:', err);
    }
}

testConnection();

export default db;
