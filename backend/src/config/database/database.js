import { MongoClient, Db } from 'mongodb';

import { DATABASE_INFO } from '../env.js';
import { Logger } from '../logger/logger.js';

/**
 * База данных
 * @type {Db}
*/
export let DB;

await MongoClient.connect(`mongodb://${DATABASE_INFO.root}:${DATABASE_INFO.pass}@localhost:${DATABASE_INFO.port}/`)
.then((client) => {
    DB = client.db('bicycle');
    Logger.info('Database connected successfully');
}).catch((err) => { Logger.crit(`Database connection error: ${err}`); })