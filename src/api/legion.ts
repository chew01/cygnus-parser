import axios from 'axios';
import { API_URL } from '../config';
import { rawRankingData } from '../types/rawRankingData';
import log from '../utils/logger';
import { overallRankingData } from './overall';

export type legionRankingData = {
    CharacterName: string,
    CharacterImgUrl: string,
    Level: number,
    Exp: bigint
    JobName: string,
    JobID: number,
    WorldName: string,
    WorldID: number
    OverallRank: number,
    LegionLevel: number,
    RaidPower: bigint,
    LegionRank: number
}

async function getLegionRankingWithOverallData(overallData: overallRankingData):
    Promise<legionRankingData> {
  const result = await axios.get(`${API_URL}/ranking?id=legion&id2=${overallData.WorldID}&character_name=${overallData.CharacterName}`);
  const legionData = result.data.map((data: rawRankingData) => {
    const {
      LegionLevel, RaidPower,
    } = data;
    const LegionRank = data.Rank;
    return {
      ...overallData, LegionLevel, RaidPower, LegionRank,
    };
  });
  return legionData[0];
}

async function getLegionRanking(data: overallRankingData[]): Promise<legionRankingData[]> {
  log.info(`Fetching legion rankings for ${data.length} characters.`);
  const legionRanking = data.map(getLegionRankingWithOverallData);
  return Promise.all(legionRanking);
}

export default getLegionRanking;
