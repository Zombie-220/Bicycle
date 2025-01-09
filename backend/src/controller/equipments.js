import { request, response } from "express";

import { GetEquipmentByAmount_M } from '../models/equipments.js';
import { logger } from "../config/logger/logger.js";
import { Encryp } from "../helpers/encryption.js";

/**
 * @param {request} req 
 * @param {response} res 
*/
export const GetEquipmentByAmount_C = async (req, res) => {
    try {
        const equipments = await GetEquipmentByAmount_M(req.params.amount);
        var equipmentsInfo = [];
        equipments.map((data) => {
            equipmentsInfo.push({
                _id: Encryp(`${data._id}`),
                name: Encryp(data.name),
                productImage: data.productImage,
                price: Encryp(`${data.price}`),
                amount: Encryp(`${data.amount}`),
                discount: Encryp(`${data.discount}`)
            });
        });

        res.json(equipmentsInfo);
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'Get equipments by amount failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}