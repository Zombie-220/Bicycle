import { request, response } from "express";

import { GetBicyclesOrderBy_M, GetBicycleById_M } from '../models/bicycles.js';
import { BicyclesService } from "../services/bicycles.js";
import { logger } from "../config/logger/logger.js";

/**
 * @param {request} req 
 * @param {response} res
 * @returns {void}
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

/**
 * @param {request} req 
 * @param {response} res 
 * @returns {void}
*/
export const getBicycleById_C = async (req, res) => {
    try {
        const bicycleInfo = await GetBicycleById_M(req.params.id);
        res.json({
            brand: bicycleInfo.brand,
            model: bicycleInfo.model,
            productImage: bicycleInfo.productImage,
            size: bicycleInfo.size,
            color: bicycleInfo.color,
            price: bicycleInfo.price,
            amount: bicycleInfo.amount,
            technicalPassport: bicycleInfo.technicalPassport
        });
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'get bicycle by id failed' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
}


export const BicyclesController = {
    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {void}
    */
    getByAmount: async function(req, res) {
        try {
            const bicycles = await BicyclesService.getByAmount(req.params.amount);

            res.json(bicycles);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get bicycles by amount failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    /**
     * @param {request} req
     * @param {response} res
     * @returns {void}
    */
    getLatest: async function(req, res) {
        try {
            const latestBicycles = await BicyclesService.getLatest(req.params.amount);

            res.json(latestBicycles);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'get bicycle by id failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    }
}