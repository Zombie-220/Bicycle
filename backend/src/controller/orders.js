import { request, response } from "express"

import { Logger } from "../config/logger/logger.js";
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
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'create order failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
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
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'get order by id failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    /** 
     * @param {request} req 
     * @param {response} res 
     * @returns {Promise<void>}
    */
    deleteItem: async function(req, res) {
        try {
            const deleteOrder = await OrdersService.deleteItem(req.body.orderId, req.body.itemId);

            res.json(deleteOrder);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'delete item from ordder failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    /** 
     * @param {response} req 
     * @param {request} res 
     * @returns {Promise<void>}
    */
    updateStatus: async function(req, res) {
        try {
            const updatedOrder = await OrdersService.updateStatus(req.body.orderId, req.body.status);

            res.json(updatedOrder);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'update status failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    getAll: async function(req, res) {
        try {
            const ordersInfo = await OrdersService.getAll();
            
            res.json(ordersInfo);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'get all orders info failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    }
}