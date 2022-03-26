import getOverallRanking from './api/overall';
import { MINIMUM_LEVEL } from './config';
import { initializeDB } from './db/postgres';
import log from './utils/logger';
import getLegionRanking from './api/legion';
import { upsertLegionData } from './db/upsertData';

initializeDB().catch((err) => log.error(err.stack));
getOverallRanking(MINIMUM_LEVEL).then(getLegionRanking).then(upsertLegionData);
