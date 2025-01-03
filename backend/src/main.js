import express from 'express';
import { MongoClient, Collection } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';

import { logger } from './config/logger/logger.js';
import { UsersRouter } from './routes/users.js';
import { ProductsRouter } from './routes/products.js';

import { PORT, DATABASE_PORT } from './config/env.js';
import { __dirname } from './helpers/__dirname.js';

dotenv.config();

const ACCEPTED_ORIGINS = ['http://localhost:15924', 'https://localhost:15924'];
export const app = express();

/** @type {Collection} */
export let UserCollection;
/** @type {Collection} */
export let ProductsCollection;

MongoClient.connect(`mongodb://root:pass@localhost:${DATABASE_PORT}/`).then(client => {
    const DB = client.db('bicycle');
    UserCollection = DB.collection('users');
    ProductsCollection = DB.collection('bicycles');
    console.log(__dirname);

    logger.info('Connected to DB');

    app.use(express.json());
    app.use(cors({
        origin: ACCEPTED_ORIGINS,
        methods: 'POST, GET, DELETE, PATCH'
    }));

    app.use('/users', UsersRouter);
    app.use('/products', ProductsRouter);

    app.listen(PORT, () => { logger.info(`Server is running on http://localhost:${PORT}`); });
}).catch(err => { logger.crit(`Connected to DB: ${err}`); });