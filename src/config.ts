import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env') });

export const {
  DB_HOSTNAME, DB_NAME, DB_USERNAME, DB_PASSWORD, API_URL,
} = process.env;
export const DB_PORT = Number(process.env.DB_PORT) ?? 5432;
export const MINIMUM_LEVEL = Number(process.env.MINIMUM_LEVEL) ?? 200;
export const DB_MAX_CLIENTS = Number(process.env.DB_MAX_CLIENTS) ?? 5;

if (!DB_HOSTNAME) throw new Error('Database hostname was not specified!');
if (!DB_NAME) throw new Error('Database name was not specified!');
if (!DB_USERNAME) throw new Error('Database username was not specified!');
if (!DB_PASSWORD) throw new Error('Database password was not specified!');
if (!API_URL) throw new Error('API URL was not specified!');
