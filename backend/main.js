import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

import { logger } from './logger/logger.js';
import { productRouter } from './groups/products.js';
import { usersRouter } from './groups/users.js';

const port = 5481;
export const app = express();
export let DB;

MongoClient.connect('mongodb://root:pass@localhost:27017/').then(client => {
    DB = client.db('bicycle');
    logger.info('Connected to DB');
    
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:5624',
        methods: 'POST, GET, DELETE, PATCH'
    }));

    app.use('/products', productRouter);
    app.use('/users', usersRouter);

    app.listen(port, () => { logger.info(`Server is running on http://localhost:${port}`); });
}).catch(err => { logger.crit(`Connected to DB: ${err}`); });