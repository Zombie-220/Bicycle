import { request, response } from "express"

import { logger } from "../config/logger/logger.js";
import { OrdersService } from '../services/orders.js';

export const OrdersController = {
    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {Promise<void>}
    */
    createOrder: async function(req, res) {
        try {
            const orderId = await OrdersService.create(req.body.id, req.body.orderInfo, req.body.userId, req.body.timestamp);

            res.json(orderId);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'create order failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {Promise<void>}
    */
    getOrder: async function(req, res) {
        try {
            const orderInfo = await OrdersService.getOne(req.params.id);

            res.json(orderInfo);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'get order by id failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    deleteItem: async function(req, res) {
        try {
            const deleteOrder = await OrdersService.deleteItem(req.body.orderId, req.body.itemId);

            res.json(deleteOrder);
            logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'delete item from ordder failed' });
            logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    }
}