import axios from 'axios';
import { API_URL } from '../config';
import log from '../utils/logger';
import { rawRankingData } from '../types/rawRankingData';

export type overallRankingData = {
    CharacterName: string,
    CharacterImgUrl: string,
    Level: number,
    Exp: bigint,
    JobName: string,
    JobID: number,
    WorldName: string,
    WorldID: number
    OverallRank: number,
}

async function getOverallRankingByPageIndex(pageIndex: number):
    Promise<overallRankingData[]> {
  const result = await axios.get(`${API_URL}/ranking?id=overall&id2=legendary&rebootIndex=0&page_index=${pageIndex}`);
  return result.data.map((data: rawRankingData) => {
    const {
      CharacterName, CharacterImgUrl, Level, Exp, JobName, JobID, WorldName, WorldID,
    } = data;
    const OverallRank = data.Rank;
    return {
      CharacterName, CharacterImgUrl, Level, Exp, JobName, JobID, WorldName, WorldID, OverallRank,
    };
  });
}

const rankingArray: overallRankingData[] = [];
let count = 0;

async function getOverallRanking(minLevel: number): Promise<overallRankingData[]> {
  log.info(`Fetching overall rankings. Total fetched: ${count}`);
  try {
    const result = await getOverallRankingByPageIndex(count + 1);

    result.forEach((charData) => rankingArray.push(charData));
    if (!rankingArray.some((charData) => charData.Level < minLevel)) {
      count += 5;
      await getOverallRanking(minLevel);
    }
  } catch (err) {
    if (err instanceof Error) {
      log.error(err.message);
    }
    log.error('Unidentified error while fetching overall ranking.');
  }
  return rankingArray;
}

export default getOverallRanking;
