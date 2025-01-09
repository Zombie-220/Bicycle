import { request, response } from "express";

import { GetBicyclesByAmount_M, GetAllBicycles } from '../models/bicycles.js';
import { logger } from "../config/logger/logger.js";
import { Encryp } from "../helpers/encryption.js";

/**
 * @param {request} req 
 * @param {response} res 
*/
export const GetBicyclesByAmount_C = async (req, res) => {
    try {
        var bicycleInfo = [];
        if (req.params.amount !== 'all') {
            const bicycles = await GetBicyclesByAmount_M(req.params.amount);
            bicycles.map((data) => {
                bicycleInfo.push({
                    _id: Encryp(`${data._id}`),
                    name: Encryp(data.name),
                    productImage: data.productImage,
                    countryImage: data.countryImage,
                    price: Encryp(`${data.price}`),
                    amount: Encryp(`${data.amount}`),
                    discount: Encryp('0')
                });
            });
        } else {
            const bicycles = await GetAllBicycles();
            bicycles.map((data) => {
                bicycleInfo.push({
                    _id: Encryp(`${data._id}`),
                    name: Encryp(data.name),
                    productImage: data.productImage,
                    countryImage: data.countryImage,
                    price: Encryp(`${data.price}`),
                    amount: Encryp(`${data.amount}`),
                    discount: Encryp('0')
                });
            })
        }

        res.json(bicycleInfo);
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'Get bicycles by amount failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}