import axios from 'axios';
import { API_URL } from '../config';
import { rawRankingData } from '../types/rawRankingData';
import log from '../utils/logger';
import { legionRankingData } from './legion';

export type worldRankingData = {
    CharacterName: string,
    CharacterImgUrl: string,
    Level: number,
    Exp: bigint
    JobName: string,
    WorldName: string,
    WorldID: number
    OverallRank: number,
    LegionLevel: number | null,
    RaidPower: bigint | null,
    LegionRank: number | null,
    WorldRank: number,
}

async function getWorldRankingWithLegionData(legionData: legionRankingData):
    Promise<worldRankingData> {
  const result = await axios.get(`${API_URL}/ranking?id=world&id2=${legionData.WorldID}&character_name=${encodeURIComponent(legionData.CharacterName)}`);
  const worldData = result.data.map((data: rawRankingData) => {
    const WorldRank = data.Rank;
    return {
      ...legionData, WorldRank,
    };
  });

  return worldData[0];
}

async function getWorldRanking(data: legionRankingData[]): Promise<worldRankingData[]> {
  log.info(`Fetching world rankings for ${data.length} characters.`);
  const worldRanking = data.map(getWorldRankingWithLegionData);
  return Promise.all(worldRanking);
}

export default getWorldRanking;
