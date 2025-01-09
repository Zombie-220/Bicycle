import { request, response } from "express";

import { GetEquipmentByAmount_M } from '../models/equipments.js';
import { logger } from "../config/logger/logger.js";


/**
 * @param {request} req 
 * @param {response} res 
*/
export const GetEquipmentByAmount_C = async (req, res) => {
    try {
        const equipments = await GetEquipmentByAmount_M(req.params.amount);
        res.json(equipments);
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'Get equipments by amount failed' });
        logger.info(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}