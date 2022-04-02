import axios from 'axios';
import axiosRetry from 'axios-retry';
import { API_URL } from '../config';
import log from '../utils/logger';
import { rawRankingData } from '../types/rawRankingData';
import { convertExpPercentage, convertJobs } from '../utils/helper';

export type overallRankingData = {
    CharacterName: string,
    CharacterImgUrl: string,
    Level: number,
    Exp: bigint,
    ExpPercent: number,
    JobName: string,
    WorldName: string,
    WorldID: number,
    OverallRank: number,
}

async function getOverallRankingByPageIndex(pageIndex: number):
    Promise<overallRankingData[]> {
  axiosRetry(axios, { retries: 3 });
  const result = await axios.get(`${API_URL}/ranking?id=overall&id2=legendary&rebootIndex=0&page_index=${pageIndex}`);
  return result.data.map((data: rawRankingData) => {
    const {
      CharacterName, CharacterImgUrl, Level, Exp, WorldName, JobID, JobDetail, WorldID,
    } = data;
    const OverallRank = data.Rank;
    const ExpPercent = convertExpPercentage(Level, Exp);
    const JobName = convertJobs(JobID, JobDetail);
    return {
      CharacterName,
      CharacterImgUrl,
      Level,
      Exp,
      ExpPercent,
      JobName,
      WorldName,
      OverallRank,
      WorldID,
    };
  });
}

const rankingArray: overallRankingData[] = [];
let count = 0;

async function getOverallRanking(minLevel: number): Promise<overallRankingData[]> {
  log.info(`Fetching overall rankings. Total fetched: ${count}`);
  const result = await getOverallRankingByPageIndex(count + 1);

  result.forEach((charData) => rankingArray.push(charData));
  if (!rankingArray.some((charData) => charData.Level < minLevel)) {
    count += 5;
    await getOverallRanking(minLevel);
  }
  return rankingArray;
}

export default getOverallRanking;
