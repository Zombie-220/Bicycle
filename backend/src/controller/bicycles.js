import { request, response } from "express";

import { BicyclesService } from "../services/bicycles.js";
import { logger } from "../config/logger/logger.js";

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
            res.status(500).json({ message: 'get latest bicycles failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {void}
    */
    orderBy: async function(req, res) {
        try {
            if (req.query.field && req.query.summ) {
                const result = await BicyclesService.orderBy(req.query.field, req.query.summ);

                res.json(result);
                logger.info(`${req.method} ${req.baseUrl}${req.url}`);
            } else {
                res.status(400).json({ message: 'not enough data' });
                logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${'not enough data'}`);
            }
        } catch (err) {
            res.status(500).json({ message: 'get order by bicycles failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {void}
    */
    getById: async function(req, res) {
        try {
            const bicycle = await BicyclesService.getById(req.params.id);

            res.json(bicycle);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'get bicycle by id failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {void}
    */
    filter: async function(req, res) {
        try {
            const filteredBicycles = await BicyclesService.filter(req.query);

            res.json(filteredBicycles);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'get bicycle with filter failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    }
}