import { Router } from "express";

import { BicyclesController } from "../controller/bicycles.js";

export const BicyclesRouter = Router();

/**
 * @swagger
 * tags:
 *   name: bicycles
 *   description: bicycle management
 */

/**
 * @swagger
 * /bicycles/amount/{amount}:
 *   get:
 *     summary: get number of bicycles
 *     tags: [bicycles]
 *     parameters:
 *       - in: path
 *         name: amount
 *         schema:
 *           anyOf:
 *             - type: string
 *             - type: "null"
 *         description: amount of bicycles
 *         example: 3
 *     responses:
 *       200:
 *         description: certain amount of bicycles
 *         content:
 *           applicaion/json:
 *             schema:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 677399f8a9f6f48076eff314
 *                     amount:
 *                       type: number
 *                       example: 10
 *                     itemImage:
 *                       type: string
 *                       example: base64 format
 *                     countryImage:
 *                       type: string
 *                       example: base64 format
 *                     brand:
 *                       type: string
 *                       example: Trek
 *                     model:
 *                       type: string
 *                       example: Marlin 5
 *                     price:
 *                       type: number
 *                       example: 69000
 *                     discount:
 *                       type: number
 *                       example: 20
 *       500:
 *         $ref: '#/components/responses/500'
 */
BicyclesRouter.get('/amount/:amount?', BicyclesController.getByAmount);

/**
 * @swagger
 * /bicycles/latest/{amount}:
 *   get:
 *     summary: get number of bicycles by date
 *     tags: [bicycles]
 *     parameters:
 *       - in: path
 *         name: amount
 *         schema:
 *           anyOf:
 *             - type: string
 *             - type: "null"
 *         description: amount of bicycles
 *         example: 3
 *     responses:
 *       200:
 *         description: certain amount of bicycles
 *         content:
 *           applicaion/json:
 *             schema:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 677399f8a9f6f48076eff314
 *                     amount:
 *                       type: number
 *                       example: 10
 *                     itemImage:
 *                       type: string
 *                       example: base64 format
 *                     countryImage:
 *                       type: string
 *                       example: base64 format
 *                     brand:
 *                       type: string
 *                       example: Trek
 *                     model:
 *                       type: string
 *                       example: Marlin 5
 *                     price:
 *                       type: number
 *                       example: 69000
 *                     discount:
 *                       type: number
 *                       example: 20
 *       500:
 *         $ref: '#/components/responses/500'
 */
BicyclesRouter.get('/latest/:amount?', BicyclesController.getLatest);


BicyclesRouter.get('/orderBy', BicyclesController.orderBy);
BicyclesRouter.get('/filter', BicyclesController.filter);
BicyclesRouter.get('/catalog-menu', BicyclesController.catalogMenu);

/**
 * @swagger
 * /bicycles/{id}:
 *   get:
 *     summary: get info about bicycle by id
 *     tags: [bicycles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: bicycle id
 *         example: 677399f8a9f6f48076eff314
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   amount:
 *                     type: number
 *                     example: 10
 *                   itemImage:
 *                     type: string
 *                     example: base64 format
 *                   countryImage:
 *                     type: string
 *                     example: base64 format
 *                   brand:
 *                     type: string
 *                     example: Trek
 *                   model:
 *                     type: string
 *                     example: Marlin 5
 *                   price:
 *                     type: number
 *                     example: 69000
 *                   discount:
 *                     type: number
 *                     example: 20
 *                   colors:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: [Red, Black]
 *                   sizes:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: [S, M, L]
 *                   technicalPassport:
 *                     type: object
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
BicyclesRouter.get('/:id', BicyclesController.getById);

/**
 * @swagger
 * /bicycles/change/{id}:
 *   patch:
 *     summary: change info about bicycle
 *     tags: [bicycles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: bicycle id
 *         example: 677399f8a9f6f48076eff314
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 10
 *               itemImage:
 *                 type: string
 *                 example: base64 format
 *               countryImage:
 *                 type: string
 *                 example: base64 format
 *               brand:
 *                 type: string
 *                 example: Trek
 *               model:
 *                 type: string
 *                 example: Marlin 5
 *               price:
 *                 type: number
 *                 example: 69000
 *               discount:
 *                 type: number
 *                 example: 20
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Red, Black]
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [S, M, L]
 *               technicalPassport:
 *                 type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: boolean
 *                     example: true
 *       400:
 *         $ref: '#/components/responses/400'
 *       403:
 *         $ref: '#/components/responses/403'
 *       404:
 *         $ref: '#/components/responses/404'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 */
BicyclesRouter.patch('/change', BicyclesController.change);