import { Pool } from 'pg';
import log from '../utils/logger';
import {
  DB_HOSTNAME, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME,
} from '../config';

export const pool = new Pool({
  user: DB_USERNAME,
  host: DB_HOSTNAME,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

pool.on('error', (err) => {
  log.error('Unexpected error on idle client', err.message);
  process.exit(-1);
});

export async function initializeDB() {
  log.info('[DB] Connecting to database...');
  const client = await pool.connect();
  try {
    log.info('[DB] Database connection successful. Initializing tables...');
    await client.query('CREATE TABLE IF NOT EXISTS overallRanking ('
            + 'characterName TEXT PRIMARY KEY,'
            + 'characterImgUrl TEXT,'
            + 'level INTEGER,'
            + 'jobName TEXT,'
            + 'jobId INTEGER,'
            + 'worldName TEXT,'
            + 'worldId INTEGER,'
            + 'rank INTEGER,'
            + 'gap INTEGER'
            + ');');
  } finally {
    client.release();
    log.info('[DB] Tables initialized. Client has been released.');
  }
}
