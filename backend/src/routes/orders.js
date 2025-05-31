import { Router } from "express";

import { OrdersController } from '../controller/orders.js';

export const OrdersRouter = Router();

/**
 * @swagger
 * tags:
 *   name: orders
 *   description: order management
 */

/**
 * @swagger
 * /orders/all:
 *   get:
 *     summary: get info about all orders
 *     tags: [orders]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 677399f8a9f6f48076eff314
 *                     type:
 *                       type: string
 *                       example: bicycles
 *                     size:
 *                       type: string
 *                       example: S
 *                     color:
 *                       type: string
 *                       example: Black
 *                     amount:
 *                       type: number
 *                       example: 1
 *       500:
 *         $ref: '#/components/responses/500'
 */
OrdersRouter.get('/all', OrdersController.getAll);

/**
 * @swagger
 * /orders/createOrder:
 *   put:
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
 *       500:
 *         $ref: '#/components/responses/500'
 */
OrdersRouter.put('/createOrder', OrdersController.createOrder);

/**
 * @swagger
 * /orders/deleteItem/{orderId}/{itemId}:
 *   delete:
 *     summary: delete item from order
 *     tags: [orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         description: order id
 *         example: 68175a242850f6c7aeb2add1
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         description: item id for removal
 *         example: 677399f8a9f6f48076eff314
 *     responses:
 *       200:
 *         desription: item deleted from order
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: boolean
 *                     description: result about operation
 *                     example: true
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
OrdersRouter.delete('/deleteItem', OrdersController.deleteItem);

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

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: get info about order by id
 *     tags: [orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: order id
 *         example: 68175a242850f6c7aeb2add1
 *     responses:
 *       200:
 *         desription: order info
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   itemsInfo:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 677399f8a9f6f48076eff314
 *                         type:
 *                           type: string
 *                           example: bicycles
 *                         size:
 *                           type: string
 *                           example: S
 *                         color:
 *                           type: string
 *                           example: Black
 *                         amount:
 *                           type: number
 *                           example: 1
 *                     description: info about item
 *                   userId:
 *                     type: string
 *                     description: user id
 *                     example: 67798fe945c6d48433cdc50e
 *                   datetime:
 *                     type: string
 *                     description: date of creating order
 *                     example: 04-05-2025 19:14:28
 *                   status:
 *                     type: number
 *                     description: order status
 *                     example: 0
 *                   paymentStatus:
 *                     type: boolean
 *                     description: status of payment
 *                     example: false
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
OrdersRouter.get('/:id', OrdersController.getOrder);