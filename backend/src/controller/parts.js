import { PartsService } from '../services/parts.js';
import { logger } from '../config/logger/logger.js';

export const PartsController = {
    byAmount: async function(req, res) {
        try {
            const equipments = await PartsService.byAmount(req.params.amount);

            res.json(equipments);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get parts by amount failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    catalogMenu: async function(req, res) {
        try {
            const equipmentsMenu = await PartsService.catalogMenu();

            res.json(equipmentsMenu);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'get menu for parts failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    getById: async function(req, res) {
        try {
            const part = await PartsService.getById(req.params.id);

            res.json(part);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'Get parts by id failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    }
};