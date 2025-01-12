import { request, response } from "express";

import { GetBicyclesByAmount_M, GetAllBicycles, GetBicyclesOrderBy_M } from '../models/bicycles.js';
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
                    brand: Encryp(data.brand),
                    model: Encryp(data.model),
                    productImage: data.productImage,
                    countryImage: data.countryImage,
                    price: Encryp(`${data.price}`),
                    amount: Encryp(`${data.amount}`),
                    discount: Encryp(`${data.discount}`)
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

/**
 * @param {request} req 
 * @param {response} res 
*/
export const GetBicyclesOrderBy_C = async (req, res) => {
    if (req.query.field && req.query.summ) {
        try {
            const bicycleCategories = await GetBicyclesOrderBy_M(req.query.field, req.query.summ);
            res.json(bicycleCategories);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get bicycle categories failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    } else {
        res.status(400).json({ message: 'not enough data' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${'not enough data'}`);
    }
}