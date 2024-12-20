import express from 'express';
import { ObjectId } from 'mongodb';

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

ProductRouter.get('/amount/:am', async (req, res) => {
    try {
        const collection = DB.collection('bicycleProducts');
        const response = await collection.find().limit(parseInt(req.params.am)).toArray();

        res.json(response);
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

ProductRouter.get('/byID/:id', async (req, res) => {
    try {
        const collection = DB.collection('bicycleProducts');
        const response = await collection.findOne({ _id: new ObjectId(req.params.id) })
        res.json(response)
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

ProductRouter.post('/delete', async(req, res) => {
    try {
        const collection = DB.collection('bicycleProducts');
        const response = await collection.deleteOne({ _id: new ObjectId(req.body.productId) });

        res.json({ 'status': 200 })
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

ProductRouter.post('/change', async(req, res) => {
    try {
        const collection = DB.collection('bicycleProducts');
        const result = await collection.updateOne(
            { _id: new ObjectId(req.body._id) },
            { $set: {
                name: req.body.name,
                productImage: req.body.productImage,
                countryImage: req.body.countryImage,
                price: req.body.price,
                amount: req.body.amount
            }}
        )

        res.json({ 'status': 200 })
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

ProductRouter.post('/add', async(req, res) => {
    try {
        const collection = DB.collection('bicycleProducts');
        const result = await collection.insertOne({
            name: req.body.name,
            productImage: req.body.productImage,
            countryImage: req.body.countryImage,
            price: req.body.price,
            amount: req.body.amount
        })

        res.json({ 'status': 200 })
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});