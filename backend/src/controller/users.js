import { request, response } from "express";

import { CreateUser_S } from "../service/users.js";
import { logger } from "../config/logger/logger.js";

/** 
 * @param {request} req
 * @param {response} res
*/
export const CreateUser_C = async (req, res) => {
    try {
        const user = await CreateUser_S(req.body);
        res.status(201).json({ message: 'user created success' });
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(400).json({ message: 'user create failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}