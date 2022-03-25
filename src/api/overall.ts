import axios from 'axios';
import { API_URL } from '../config';
import log from '../utils/logger';
import { rawRankingData } from '../types/rawRankingData';

export type overallRankingData = {
    CharacterName: string,
    CharacterImgUrl: string,
    Level: number,
    JobName: string,
    JobID: number,
    WorldName: string,
    WorldID: number
    Rank: number,
}

async function getOverallRankingByPageIndex(pageIndex: number):
    Promise<overallRankingData[] | void> {
  try {
    const result = await axios.get(`${API_URL}/ranking?id=overall&id2=legendary&rebootIndex=0&page_index=${pageIndex}`);
    return result.data.map((data: rawRankingData) => {
      const {
        CharacterName, CharacterImgUrl, Level, JobName, JobID, WorldName, WorldID, Rank,
      } = data;
      return {
        CharacterName, CharacterImgUrl, Level, JobName, JobID, WorldName, WorldID, Rank,
      };
    });
  } catch (err) {
    if (err instanceof Error) {
      return log.error(err.message);
    }
    return log.error('Unidentified error.');
  }
}

const rankingArray: overallRankingData[] = [];
let count = 0;

async function getOverallRanking(minLevel: number): Promise<overallRankingData[]> {
  log.info(`Fetching overall rankings. Total fetched: ${count}`);
  const result = await getOverallRankingByPageIndex(count + 1);
  if (!result) return [];
  result.forEach((charData) => rankingArray.push(charData));
  if (!rankingArray.some((charData) => charData.Level < minLevel)) {
    count += 5;
    await getOverallRanking(minLevel);
  }
  return rankingArray;
}

export default getOverallRanking;
