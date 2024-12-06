import express from 'express';

import { DB } from '../main.js';
import { logger } from '../logger/logger.js';

export const ordersRouter = express.Router();

ordersRouter.post('/add', async (req, res) => {
    try {
        const collection = DB.collection('orders');
        console.log(req.body);

        res.json({ 'response': 200 });
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});