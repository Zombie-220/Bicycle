import { request, response } from "express";

import { CreateUser_M, FindUsername_M, GetUserPass_M } from "../models/users.js";
import { logger } from "../config/logger/logger.js";

/**
 * @param {request} req
 * @param {response} res
*/
export const CreateUser_C = async (req, res) => {
    try {
        const user = await CreateUser_M(req.body);
        res.status(201).json({ message: 'user created success' });
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(400).json({ message: 'user create failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}

/**
 * @param {request} req
 * @param {response} res
*/
export const FindUsername_C = async (req, res) => {
    try {
        const userId = await FindUsername_M(req.params.name);
        res.json({ id: userId });
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'find user by name failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}

export const LoginUser_C = async (req, res) => {
    try {
        const user = await GetUserPass_M(req.body.name, req.body.password);
        res.json({ id: user });
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'login failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}