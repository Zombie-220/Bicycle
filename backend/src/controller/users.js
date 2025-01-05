import { request, response } from "express";

import { Decrypt_front } from "../helpers/encryption.js";
import { CheckUserByName, GetUserRoles, LoginUserByName } from "../models/users.js";
import { RegisterUser_S } from "../services/users.js";
import { logger } from "../config/logger/logger.js";

/**
 * @param {request} req
 * @param {response} res
*/
export const CheckUser = async (req, res) => {
    try {
        if (req.query.name) {
            const decryptedName = Decrypt_front(req.query.name.replace(' ', '+'));
            const userId = await CheckUserByName(decryptedName);
            res.json({ id: userId });
        } else if (req.query.isAdmin) {
            const userRoles = await GetUserRoles(req.query.isAdmin);
            res.json(userRoles.includes('admin') ? { response: true } : { response: false });
        } else {
            res.status(400).json({ message: 'Not enough data to verify' });
        }
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'check user failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}

/**
 * @param {request} req
 * @param {response} res
*/
export const RegisterUser = async (req, res) => {
    try {
        const newUserId = await RegisterUser_S(req.body);
        res.status(200).json({ id: newUserId });
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'create user failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}

/**
 * @param {request} req
 * @param {response} res
*/
export const LoginUser = async (req, res) => {
    try {
        const userId = await LoginUserByName(req.body.name, req.body.password);
        res.json({ id: userId });
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'login failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}