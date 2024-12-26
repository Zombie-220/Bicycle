import { Router } from 'express';
import { ObjectId } from 'mongodb';

import { UserCollection } from '../main.js';
import { logger } from '../logger/logger.js';

export const UsersRouter = Router();

UsersRouter.post('/login', async (req, res) => {
    try {
        const findUserByName = await UserCollection.findOne({ name: req.body.name });
        if (findUserByName != null) {
            if (findUserByName.password == req.body.password) {
                if (req.body.getToken) { res.json({ id: findUserByName._id, token: findUserByName._id }); }
                else { res.json({ id: findUserByName._id }); }
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

        const user = await UserCollection.findOne({ name: userName });

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
        const request = await UserCollection.insertOne(body);

        res.status(201).json({ 'response': request.insertedId })
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong @_@' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});

UsersRouter.get('/isAdmin/(:id)', async(req, res) => {
    try {
        const result = await UserCollection.findOne({ _id: new ObjectId(req.params.id) })
        
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
        const recoverUser = await UserCollection.findOne({ name: req.params.name });

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