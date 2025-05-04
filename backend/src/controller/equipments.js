import { request, response } from "express";

import { EquipmentsService } from "../services/equipments.js";
import { logger } from "../config/logger/logger.js";

export const EquipmentsCotroller = {
    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {void}
    */
    byAmount: async function(req, res) {
        try {
            const equipments = await EquipmentsService.byAmount(req.params.amount);

            res.json(equipments);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get equipments by amount failed' });
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
            const equipment = await EquipmentsService.getById(req.params.id);

            res.json(equipment);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get equipment by id failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    catalogMenu: async function(req, res) {
        try {
            const equipmentMenu = await EquipmentsService.catalogMenu();

            res.json(equipmentMenu);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get catalog manu for equipment failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    }
}