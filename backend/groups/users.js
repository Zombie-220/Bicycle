import express from 'express';

import { DB } from '../main.js';
import { logger } from '../logger/logger.js';

export const usersRouter = express.Router();

usersRouter.post('/login', async (req, res) => {
    try {
        const userName = req.body.name;
        const userPassword = req.body.password;

        const collection = DB.collection('users');
        const user = await collection.findOne({ name: userName });
        if (user != null) {
            if (user.password == userPassword) { res.json({ 'response': true }); }
            else { res.json({ 'response': false }); }
        } else { res.json({ 'response': false }); }

        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

usersRouter.post('/checkName', async (req, res) => {
    try {
        const userName = req.body.name

        const collection = DB.collection('users');
        const user = await collection.findOne({ name: userName });

        if (user != null) { res.json({ 'response': true }); }
        else { res.json({ 'response': false }); }

        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

usersRouter.post('/add', async (req, res) => {
    try {
        const body = { ...req.body, roles: ['user'] };

        const request = await DB.collection('users').insertOne(body);

        res.json({ 'response': 200 })
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});