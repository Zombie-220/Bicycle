import { request, response } from "express";

import { Decrypt, Encryp } from "../helpers/encryption.js";
import { CheckUserByName, GetUserRoles } from "../models/users.js";
import { RegisterUser_S, LoginUser_S } from "../services/users.js";
import { logger } from "../config/logger/logger.js";


/**
 * @param {request} req
 * @param {response} res
*/
export const CheckUser = async (req, res) => {
    try {
        if (req.query.name) {
            const decryptedName = Decrypt(req.query.name);
            const userId = await CheckUserByName(decryptedName);
            res.json({ id: userId });
        } else if (req.query.isAdmin) {
            const decryptIsAdmin = Decrypt(req.query.isAdmin);
            const userRoles = await GetUserRoles(decryptIsAdmin);
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
        res.json({ id: newUserId });
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
        const decryptedData = {
            name: Decrypt(req.body.name),
            password: Decrypt(req.body.password),
            getToken: getToken
        };

        const [userId, err] = await LoginUser_S(decryptedData);

        if (!err) {
            res.json({ id: Encryp(userId) });
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } else {
            res.json({ message: err });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err}`);
        }

    } catch (err) {
        res.status(500).json({ message: 'login failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}