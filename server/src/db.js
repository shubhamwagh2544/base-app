import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();
import pkg from 'lodash/lang.js';
const {isNil} = pkg;

const DB_URL = process.env.DATABASE_URL;
if (isNil(DB_URL)) {
    throw new Error('Database URL is mandatory');
}

export const sequelize = new Sequelize(DB_URL, {
    dialect: "postgres",
    logging: false, // console.log to see SQL
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    retry: {
        max: 5
    }
    // dialectOptions: { ssl: { rejectUnauthorized: false } } // for cloud DBs if needed
});

export async function testConnection() {
    try {
    await sequelize.authenticate();
    console.log('Connected to DB successfully');
    } catch (error) {
        console.error('Unable to connect to Postgres:', err);
        throw error;
    }
}
