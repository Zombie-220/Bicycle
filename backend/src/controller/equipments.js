import { request, response } from "express";

import { EquipmentsService } from "../services/equipments.js";
import { Logger } from "../config/logger/logger.js";

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
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get equipments by amount failed' });
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
            const equipment = await EquipmentsService.getById(req.params.id);

            res.json(equipment);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get equipment by id failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    catalogMenu: async function(req, res) {
        try {
            const equipmentMenu = await EquipmentsService.catalogMenu();

            res.json(equipmentMenu);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get catalog manu for equipment failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

        change: async function(req, res) {
            try {
                const equipmentChanged = await EquipmentsService.change(req.body);
    
                res.json(equipmentChanged);
                Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
            } catch (err) {
                res.status(500).json({ message: 'change equipment error' });
                Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
            }
        }
}