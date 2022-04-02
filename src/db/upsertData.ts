import format from 'pg-format';
import { pool } from './index';
import log from '../utils/logger';
import { worldRankingData } from '../api/world';

async function upsertRankingData(data: worldRankingData[]) {
  log.info(`[DB] Upserting Ranking Data... (${data.length} entries)`);
  const values = data.map((charData) => {
    const {
      CharacterName,
      CharacterImgUrl,
      Level,
      Exp,
      ExpPercent,
      JobName,
      WorldName,
      WorldID,
      OverallRank,
      LegionLevel,
      RaidPower,
      LegionRank,
      WorldRank,
    } = charData;
    return [
      CharacterName,
      CharacterImgUrl,
      Level,
      Exp,
      ExpPercent,
      JobName,
      WorldName,
      WorldID,
      OverallRank,
      LegionLevel,
      RaidPower,
      LegionRank,
      WorldRank,
    ];
  });
  const query = format('INSERT INTO ranking ('
        + 'character_name, character_img_url, level, exp, exp_percent, job_name, world_name, world_id, overall_rank, legion_level, raid_power, legion_rank, world_rank'
        + ') VALUES %L', values);
  const client = await pool.connect();
  try {
    await client.query(query);
  } catch (err) {
    if (err instanceof Error) {
      log.error(err.message);
    } else {
      log.error('Unidentified error while upserting ranking data to database.');
    }
  } finally {
    client.release();
    log.info('[DB] Ranking Data upsert action complete. Client has been released.');
  }
}

export default upsertRankingData;
