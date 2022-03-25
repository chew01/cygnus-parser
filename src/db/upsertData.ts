import format from 'pg-format';
import { overallRankingData } from '../api/overall';
import { pool } from './postgres';
import log from '../utils/logger';

export async function upsertOverallRankingData(data: overallRankingData[]) {
  log.info(`[DB] Upserting Overall Ranking Data... (${data.length} entries)`);
  const values = data.map((charData) => {
    const {
      CharacterName, CharacterImgUrl, Level, JobName, JobID, WorldName, WorldID, Rank, Gap,
    } = charData;
    return [CharacterName, CharacterImgUrl, Level, JobName, JobID, WorldName, WorldID, Rank, Gap];
  });
  const query = format('INSERT INTO overallRanking (characterName, characterImgUrl, level, jobName, jobId, worldName, worldId, rank, gap) VALUES %L', values);
  const client = await pool.connect();
  try {
    await client.query(query);
  } finally {
    client.release();
    log.info('[DB] Overall Ranking Data upsert complete. Client has been released.');
  }
}

export async function upsertLegionData() {
  throw new Error('Not implemented yet');
}
