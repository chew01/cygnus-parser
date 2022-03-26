import format from 'pg-format';
import { overallRankingData } from '../api/overall';
import { pool } from './postgres';
import log from '../utils/logger';
import { legionRankingData } from '../api/legion';

export async function upsertOverallRankingData(data: overallRankingData[]) {
  log.info(`[DB] Upserting Overall Ranking Data... (${data.length} entries)`);
  const values = data.map((charData) => {
    const {
      CharacterName, CharacterImgUrl, Level, Exp, JobName, JobID, WorldName, WorldID, OverallRank,
    } = charData;
    return [CharacterName, CharacterImgUrl, Level, Exp, JobName,
      JobID, WorldName, WorldID, OverallRank];
  });
  const query = format('INSERT INTO overallRanking (characterName, characterImgUrl, level, exp, jobName, jobId, worldName, worldId, overallRank) VALUES %L', values);
  const client = await pool.connect();
  try {
    await client.query(query);
  } finally {
    client.release();
    log.info('[DB] Overall Ranking Data upsert complete. Client has been released.');
  }
}

export async function upsertLegionData(data: legionRankingData[]) {
  log.info(`[DB] Upserting Legion Ranking Data... (${data.length} entries)`);
  const values = data.map((charData) => {
    const {
      CharacterName,
      CharacterImgUrl,
      Level,
      Exp,
      JobName,
      JobID,
      WorldName,
      WorldID,
      OverallRank,
      LegionLevel,
      RaidPower,
      LegionRank,
    } = charData;
    return [CharacterName, CharacterImgUrl, Level, Exp, JobName, JobID, WorldName,
      WorldID, OverallRank, LegionLevel, RaidPower, LegionRank];
  });
  const query = format('INSERT INTO overallRanking (characterName, characterImgUrl, level, exp, jobName, jobId, worldName, worldId, overallRank, legionLevel, raidPower, legionRank) VALUES %L', values);
  const client = await pool.connect();
  try {
    await client.query(query);
  } finally {
    client.release();
    log.info('[DB] Overall Ranking Data upsert complete. Client has been released.');
  }
}
