import { request, response } from "express";

import { Decrypt, Encrypt } from "../helpers/encryption.js";
import { UsersService } from '../services/users.js';
import { logger } from "../config/logger/logger.js";

export const UsersController = {
    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {void}
    */
    login: async function(req, res) {
        try {
            const loginUser = await UsersService.login(req.body.name, req.body.password, req.body.getToken);

            res.json(loginUser);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'login failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {void}
    */
    register: async function(req, res) {
        try {
            const newUserId = await UsersService.register(req.body.name, req.body.password, req.body.email);
    
            res.json(newUserId);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'create user failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {Promise<void>}
    */
    recover: async function(req, res) {
        try {
            const resp = await UsersService.recover(req.body.login);

            res.json(Encrypt(resp));
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'start recover failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    }
}