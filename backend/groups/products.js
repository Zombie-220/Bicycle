import express from 'express';
import cors from 'cors';

import { DB } from '../main.js';
import { logger } from '../logger/logger.js';

export const productRouter = express.Router();

productRouter.get('/best', async (req, res) => {
    try {
        const items = await DB.collection('newBicycles').find().toArray();
        res.json(items);
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);

    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});