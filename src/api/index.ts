import getOverallRanking from './overall';
import getLegionRanking from './legion';
import getWorldRanking, { worldRankingData } from './world';
import log from '../utils/logger';

async function fetchRanking(minLevel: number): Promise<worldRankingData[]> {
  try {
    const overall = await getOverallRanking(minLevel);
    const legion = await getLegionRanking(overall);
    return await getWorldRanking(legion);
  } catch (err) {
    if (err instanceof Error) {
      log.error(err.stack ? err.stack : err.message);
      return [];
    }
    log.error('Unidentified error while fetching rankings.');
    return [];
  }
}

export default fetchRanking;
