import { Pool } from 'pg';
import log from '../utils/logger';
import {
  DB_HOSTNAME, DB_MAX_CLIENTS, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME,
} from '../config';

export const pool = new Pool({
  user: DB_USERNAME,
  host: DB_HOSTNAME,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  max: DB_MAX_CLIENTS,
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
    await client.query('CREATE TABLE IF NOT EXISTS ranking ('
            + 'characterName TEXT PRIMARY KEY,'
            + 'characterImgUrl TEXT,'
            + 'level INTEGER,'
            + 'exp BIGINT,'
            + 'jobName TEXT,'
            + 'jobId INTEGER,'
            + 'worldName TEXT,'
            + 'worldId INTEGER,'
            + 'overallRank INTEGER,'
            + 'legionLevel INTEGER,'
            + 'raidPower BIGINT,'
            + 'legionRank INTEGER,'
            + 'worldRank INTEGER'
            + ');');
  } finally {
    client.release();
    log.info('[DB] Initialization action complete. Client has been released.');
  }
}
