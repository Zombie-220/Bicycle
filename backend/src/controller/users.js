import { request, response } from "express";

import { Decrypt, Encryp } from "../helpers/encryption.js";
import { CheckUserByName, GetUserRoles } from "../models/users.js";
import { RegisterUser_S, LoginUser_S } from "../services/users.js";
import { logger } from "../config/logger/logger.js";


/**
 * @param {request} req
 * @param {response} res
 * @returns {void}
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
 * @returns {void}
*/
export const RegisterUser = async (req, res) => {
    try {
        const dacryptedData = {
            name: Decrypt(req.body.name),
            email: Decrypt(req.body.email),
            password: Decrypt(req.body.password)
        };
        const newUserId = await RegisterUser_S(dacryptedData);

        res.json({ id: Encryp(`${newUserId}`) });
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'create user failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}

/**
 * @param {request} req
 * @param {response} res
 * @returns {void}
*/
export const LoginUser = async (req, res) => {
    try {
        const decryptedData = {
            name: Decrypt(req.body.name),
            password: Decrypt(req.body.password),
            getToken: req.body.getToken
        };
        const [userId, token, err] = await LoginUser_S(decryptedData);

        if (!err) {
            res.json({ id: Encryp(`${userId}`), token: token });
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } else {
            res.status(400).json({ message: err });
            logger.info(`${req.method} ${req.baseUrl}${req.url}: ${err}`);
        }
    } catch (err) {
        res.status(500).json({ message: 'login failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}