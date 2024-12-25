import { Router } from 'express';
import { ObjectId } from 'mongodb';

import { DB, UserCollection } from '../main.js';
import { logger } from '../logger/logger.js';

export const UsersRouter = Router();

UsersRouter.post('/login', async (req, res) => {
    try {
        const userName = req.body.name;
        const userPassword = req.body.password;
        const sendToken = req.body.getToken;

        const user = await UserCollection.findOne({ name: userName });
        if (user != null) {
            if (user.password == userPassword) {
                if (sendToken) { res.json({ id: user._id, token: user._id }); }
                else { res.json({ id: user._id }); }
            }
            else { res.json({ message: 'Invalid username or password' }); }
        } else { res.json({ message: 'Invalid username or password' }); }

        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong @_@' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

UsersRouter.post('/checkName', async (req, res) => {
    try {
        const userName = req.body.name

        const collection = DB.collection('users');
        const user = await collection.findOne({ name: userName });

        if (user != null) { res.json({ 'response': true }); }
        else { res.json({ 'response': false }); }

        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong @_@' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

UsersRouter.post('/add', async (req, res) => {
    try {
        const body = { ...req.body, roles: ['user'] };
        const request = await DB.collection('users').insertOne(body);

        res.status(201).json({ 'response': request.insertedId })
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong @_@' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

UsersRouter.get('/isAdmin/(:id)', async(req, res) => {
    try {
        const collection = DB.collection('users');
        const result = await collection.findOne({ _id: new ObjectId(req.params.id) })
        
        if (result.roles.includes("admin")) { res.json({ 'response': true }); }
        else { res.json({ 'response': false }); }
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

UsersRouter.get('/recover/(:name)', async(req, res) => {
    try {
        const collection = DB.collection('users');
        const recoverUser = await collection.findOne({ name: req.params.name });

        if (recoverUser === null) { res.json({ response: false }); }
        else {
            res.json({ response: 'send' });
        }
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});