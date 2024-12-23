import express from 'express';
import { MongoClient, Db } from 'mongodb';
import cors from 'cors';

import { logger } from './logger/logger.js';
import { ProductRouter } from './groups/products.js';
import { usersRouter } from './groups/users.js';
import { ordersRouter } from './groups/orders.js';

const API_PORT = 5481;
const ACCEPTED_ORIGINS = ['http://localhost:15924'];
const DATABASE_PORT = 27017;
export const app = express();
/** @type {Db} */
export let DB;

MongoClient.connect(`mongodb://root:pass@localhost:${DATABASE_PORT}/`).then(client => {
    DB = client.db('bicycle');
    logger.info('Connected to DB');
    
    app.use(express.json());
    app.use(cors({
        origin: ACCEPTED_ORIGINS,
        methods: 'POST, GET, DELETE, PATCH'
    }));

    app.use('/products', ProductRouter);
    app.use('/users', usersRouter);
    app.use('/orders', ordersRouter);

    app.listen(API_PORT, () => { logger.info(`Server is running on http://localhost:${API_PORT}`); });
}).catch(err => { logger.crit(`Connected to DB: ${err}`); });