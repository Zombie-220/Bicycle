import { Router } from 'express';
import { UsersController } from '../controller/users.js';

export const UsersRouter = Router();

/**
 * @swagger
 * tags:
 *   name: users
 *   description: user management
 */

/**
 * @swagger
 * /users/info/{id}:
 *   get:
 *     summary: Get info about user by id
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           description: user ID
 *           example: 6811b702a094dc67da32dd8c
 *     responses:
 *       200:
 *         description: a single user info
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
UsersRouter.get('/info/:id', UsersController.getInfo);
UsersRouter.get('/all', UsersController.getAllUsers);
UsersRouter.post('/login', UsersController.login);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: User registration, if possible
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: user added
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: new user id
 *                   message:
 *                      type: string
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 */
UsersRouter.post('/register', UsersController.register);
UsersRouter.post('/recover', UsersController.recover);
UsersRouter.post('/changePassword', UsersController.changePass);
UsersRouter.post('/changeName', UsersController.changeName);
UsersRouter.post('/payment', UsersController.payment);