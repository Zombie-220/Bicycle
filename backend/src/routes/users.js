import { Router } from 'express';
import { UsersController } from '../controller/users.js';

export const UsersRouter = Router();

/**
 * @swagger
 * tags:
 *   name: users
 *   description: user management
 */

UsersRouter.get('/info/:id', UsersController.getInfo);
UsersRouter.get('/all', UsersController.getAllUsers);

/**
 * @swagger
 * /users/signIn/:
 *   post:
 *     summary: user authorization
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
 *                 description: user name (unique)
 *                 example: name_user_1
 *               password:
 *                 type: string
 *                 description: user password
 *                 example: pass_user_1
 *               token:
 *                 type: string
 *                 description: remember me token
 *                 example: true
 *     responses:
 *       200:
 *         description: user authorization successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: string
 *                   description: user id
 *                   example: 682afe52d4002b96bea855fa
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: array of user roles
 *                   example: ['user']
 *                 token:
 *                   type: string
 *                   description: browser memory token
 *                   example: some symbols as token
 *       400:
 *         $ref: '#/components/responses/400'
 *       403:
 *         $ref: '#/components/responses/403'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 */
UsersRouter.post('/signIn', UsersController.login);

/**
 * @swagger
 * /users/signUp:
 *   post:
 *     summary: user registration
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
 *                 description: user name
 *                 example: name_user_1_swagger
 *               password:
 *                 type: string
 *                 description: user password
 *                 example: pass_user_1
 *               email:
 *                 type: string
 *                 description: user email
 *                 example: example@gmail.com
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
 *                     example: 682afe52d4002b96bea855fa
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: array of user roles
 *                     example: ['user']
 *                   token:
 *                     type: string
 *                     description: browser memory token
 *                     example: some symbols as token
 *       400:
 *         $ref: '#/components/responses/400'
 *       403:
 *         $ref: '#/components/responses/403'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 */
UsersRouter.post('/signUp', UsersController.register);
UsersRouter.post('/recover', UsersController.recover);
UsersRouter.post('/changePassword', UsersController.changePass);
UsersRouter.post('/changeName', UsersController.changeName);
UsersRouter.post('/payment', UsersController.payment);