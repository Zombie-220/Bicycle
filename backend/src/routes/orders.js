import { Router } from "express";

import { OrdersController } from '../controller/orders.js';

export const OrdersRouter = Router();

/**
 * @swagger
 * tags:
 *   name: orders
 *   description: order management
 */

OrdersRouter.get('/all', OrdersController.getAll);

/**
 * @swagger
 * /orders/createOrder:
 *   post:
 *     summary: create order
 *     tags: [orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 anyOf:
 *                   - type: string
 *                   - type: "null"
 *                 description: order id, can be null
 *                 example: null
 *               userId:
 *                 type: string
 *                 description: user id
 *                 example: 683076867056a9cec8965873
 *               orderInfo:
 *                 type: object
 *                 properties:
 *                   itemId:
 *                     type: string
 *                     description: item id
 *                     example: 677399f8a9f6f48076eff314
 *                   amount:
 *                     type: number
 *                     description: amount of items
 *                     example: 2
 *                   color:
 *                     type: string
 *                     description: color of item
 *                     example: black
 *                   size:
 *                     type: string
 *                     description: size of item
 *                     example: L
 *               timestamp:
 *                 type: string
 *                 description: current timestamp
 *                 example: 01-01-2025 01:00
 *     responses:
 *       200:
 *         description: order created
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                     description: order id
 *                     example: 6817c4a659f316a800ac849e
 *                   status:
 *                     type: string
 *                     description: status of order
 *                     example: created
 *       400:
 *         $ref: '#/components/responses/400'
 *       403:
 *         $ref: '#/components/responses/403'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 */
OrdersRouter.post('/createOrder', OrdersController.createOrder);
OrdersRouter.post('/deleteItem', OrdersController.deleteItem);
OrdersRouter.get('/getOrder/:id', OrdersController.getOrder);

/**
 * @swagger
 * /orders/updateStatus:
 *   post:
 *     summary: payment of the order
 *     tags: [orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: order id
 *                 example: 6817c4a659f316a800ac849e
 *               newStatus:
 *                 type: number
 *                 description: new order status
 *                 example: 1
 *               userInfo:
 *                 type: object
 *                 description: user card info
 *     responses:
 *       200:
 *         description: payment success
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                     description: orderid
 *                     example: 6817c4a659f316a800ac849e
 *                   message:
 *                     type: string
 *                     description: message about operation
 *                     example: payment success
 *       400:
 *         $ref: '#/components/responses/400'
 *       403:
 *         $ref: '#/components/responses/403'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 */
OrdersRouter.post('/updateStatus', OrdersController.updateStatus);