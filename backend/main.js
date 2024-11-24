import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

import { logger } from './logger/logger.js';
import { productRouter } from './groups/products.js';

export const app = express();
export let DB;

app.use(cors({
    origin: 'http://localhost:5624',
    methods: 'POST, GET, DELETE, PATCH'
}));

MongoClient.connect('mongodb://root:pass@localhost:27017/').then(client => {
    const port = 5481;
    DB = client.db('bicycle');

    logger.info('Connected to DB');

    app.use(express.json());
    
    app.use('/products', productRouter);

    app.listen(port, () => { logger.info(`Server is running on http://localhost:${port}`); });
}).catch(err => { logger.crit(`Connected to DB: ${err}`); });