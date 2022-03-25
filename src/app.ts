import getOverallRanking from './api/overall';
import { MINIMUM_LEVEL } from './config';
import { initializeDB } from './db/postgres';
import log from './utils/logger';
import { upsertOverallRankingData } from './db/upsertData';

initializeDB().catch((err) => log.error(err.stack));
getOverallRanking(MINIMUM_LEVEL).then(upsertOverallRankingData);
