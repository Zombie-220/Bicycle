import express from 'express';

import { DB } from '../main.js';
import { logger } from '../logger/logger.js';

export const ProductRouter = express.Router();

ProductRouter.get('/all', async (req, res) => {
    try {
        const items = await DB.collection('bicycleProducts').find().toArray();

        res.json(items);
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);

    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

ProductRouter.get('/new', async (req, res) => {
    try {
        const collection = DB.collection('bicycleProducts');
        const sortedItems = collection.find().sort({ addingData: 1 })
        const items = await sortedItems.toArray();

        res.json(items);
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);

    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});