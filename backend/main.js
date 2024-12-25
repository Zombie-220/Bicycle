import express from 'express';
import { MongoClient, Collection } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';

import { logger } from './logger/logger.js';
import { ProductRouter } from './groups/products.js';
import { UsersRouter } from './groups/users.js';
import { ordersRouter } from './groups/orders.js';

dotenv.config();

const API_PORT = process.env.API_PORT_ENV;
const DATABASE_PORT = process.env.DATABASE_PORT_ENV;
const ACCEPTED_ORIGINS = ['http://localhost:15924'];
export const app = express();

/** @type {Collection} */
export let UserCollection;
/** @type {Collection} */
export let ProductsCollection;
/** @type {Collection} */
export let OrderCollection;

MongoClient.connect(`mongodb://root:pass@localhost:${DATABASE_PORT}/`).then(client => {
    const DB = client.db('bicycle');
    UserCollection = DB.collection('users');
    ProductsCollection = DB.collection('bicycleProducts');
    OrderCollection = DB.collection('orders')

    logger.info('Connected to DB');

    app.use(express.json());
    app.use(cors({
        origin: ACCEPTED_ORIGINS,
        methods: 'POST, GET, DELETE, PATCH'
    }));

    app.use('/users', UsersRouter);

    app.use('/products', ProductRouter);
    app.use('/orders', ordersRouter);

    app.listen(API_PORT, () => { logger.info(`Server is running on http://localhost:${API_PORT}`); });
}).catch(err => { logger.crit(`Connected to DB: ${err}`); });