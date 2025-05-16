import { PartsService } from '../services/parts.js';
import { Logger } from '../config/logger/logger.js';

export const PartsController = {
    byAmount: async function(req, res) {
        try {
            const equipments = await PartsService.byAmount(req.params.amount);

            res.json(equipments);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get parts by amount failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    catalogMenu: async function(req, res) {
        try {
            const equipmentsMenu = await PartsService.catalogMenu();

            res.json(equipmentsMenu);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'get menu for parts failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    getById: async function(req, res) {
        try {
            const part = await PartsService.getById(req.params.id);

            res.json(part);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get parts by id failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    change: async function(req, res) {
        try {
            const partChanged = await PartsService.change(req.body);

            res.json(partChanged);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'change bicycle error' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    }
};