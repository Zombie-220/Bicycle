import { MongoClient, Db } from 'mongodb';

import { DATABASE_INFO } from '../env.js';
import { logger } from '../logger/logger.js';

/**
 * База данных
 * @type {Db}
*/
export let DB;

await MongoClient.connect(`mongodb://${DATABASE_INFO.root}:${DATABASE_INFO.pass}@localhost:${DATABASE_INFO.port}/`)
.then((client) => {
    DB = client.db('bicycle');
    logger.info('Database connected successfully');
}).catch((err) => { logger.crit(`Database connection error: ${err}`); })