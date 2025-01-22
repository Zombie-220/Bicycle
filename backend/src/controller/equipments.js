import { request, response } from "express";

import { GetEquipmentByAmount_M } from '../models/equipments.js';
import { logger } from "../config/logger/logger.js";
import { Encrypt } from "../helpers/encryption.js";

/**
 * @param {request} req 
 * @param {response} res 
 * @returns {void}
*/
export const GetEquipmentByAmount_C = async (req, res) => {
    try {
        const equipments = await GetEquipmentByAmount_M(req.params.amount);
        var equipmentsInfo = [];
        equipments.map((data) => {
            equipmentsInfo.push({
                _id: Encrypt(`${data._id}`),
                name: Encrypt(data.name),
                productImage: data.productImage,
                price: Encrypt(`${data.price}`),
                amount: Encrypt(`${data.amount}`),
                discount: Encrypt(`${data.discount}`)
            });
        });

        res.json(equipmentsInfo);
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'Get equipments by amount failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}