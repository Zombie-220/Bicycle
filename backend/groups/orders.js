import express from 'express';
import { ObjectId } from 'mongodb';

import { OrderCollection } from '../main.js';
import { logger } from '../logger/logger.js';

export const ordersRouter = express.Router();

ordersRouter.post('/add', async (req, res) => {
    try {
        const result = await OrderCollection.insertOne({
            totalCost: req.body.cost,
            orderInfo: req.body.products,
            orderTime: new Date(),
            user: req.body.userId,
            status: 0
        })

        res.json({ 'response': 200 });
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

ordersRouter.get('/all', async (req, res) => {
    try {
        const items = await OrderCollection.find().toArray();

        res.json({ items });
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

ordersRouter.post('/change/:id', async (req, res) => {
    try {
        const obj = await OrderCollection.findOne({ _id: new ObjectId(req.params.id) })
        const result = await OrderCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: {...obj, status: req.body.status}}
        )

        res.json({ 'status': 200 })
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});