import { AccessoriesService } from "../services/accessories.js";
import { Logger } from "../config/logger/logger.js";

export const AccessoriesController = {
    byAmount: async function(req, res) {
        try {
            const accessories = await AccessoriesService.byAmount(req.params.amount);

            res.json(accessories);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get accessories by amount failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    getById: async function(req, res) {
        try {
            const accessorie = await AccessoriesService.getById(req.params.id);

            res.json(accessorie);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get accessorie by id failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    catalogMenu: async function(req, res) {
        try {
            const equipmentMenu = await AccessoriesService.catalogMenu();

            res.json(equipmentMenu);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get catalog manu for accessorie failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    change: async function(req, res) {
        try {
            const accessorieChanged = await AccessoriesService.change(req.body);

            res.json(accessorieChanged);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'change accessorie error' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    }
};