import { request, response } from "express";

import { GetBicyclesByAmount_M } from '../models/bicycles.js';
import { logger } from "../config/logger/logger.js";

/**
 * @param {request} req 
 * @param {response} res 
*/
export const GetBicyclesByAmount_C = async (req, res) => {
    try {
        const bicycles = await GetBicyclesByAmount_M(req.params.amount);
        res.json(bicycles);
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'Get bicycles by amount failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}