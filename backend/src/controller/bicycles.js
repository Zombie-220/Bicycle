import { request, response } from "express";

import { BicyclesService } from "../services/bicycles.js";
import { Logger } from "../config/logger/logger.js";

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
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get bicycles by amount failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
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
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'get latest bicycles failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
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
                Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
            } else {
                res.status(400).json({ message: 'not enough data' });
                Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${'not enough data'}`);
            }
        } catch (err) {
            res.status(500).json({ message: 'get order by bicycles failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
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
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'get bicycle by id failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
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
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'get bicycle with filter failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {Promise<void>}
    */
    catalogMenu: async function(req, res) {
        try {
            const catalogMenu = await BicyclesService.catalogMenu();

            res.json(catalogMenu);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'get catalog page info failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    change: async function(req, res) {
        try {
            const bicycleChanged = await BicyclesService.change(req.body);

            res.json(bicycleChanged);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'change bicycle error' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    }
}