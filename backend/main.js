import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

import { logger } from './logger/logger.js';

const app = express();
const port = 5000;
const url = 'mongodb://root:pass@localhost:27017/';
const dbName = 'bicycle';

let db;

MongoClient.connect(url)
.then(client => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.use(cors());

app.get('/newBicycles', async (req, res) => {
    try {
        const items = await db.collection('newBicycles').find().toArray();
        res.json(items);
        logger.info('success: GET * FROM newBicycle');
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.error('failed: GET * FROM newBicycle');
    }
});

app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});