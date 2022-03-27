import { MINIMUM_LEVEL } from './config';
import { initializeDB } from './db';
import log from './utils/logger';
import fetchRanking from './api';

initializeDB().catch((err) => log.error(err.stack));
fetchRanking(MINIMUM_LEVEL);
