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
 *     summary: get info about user by id
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:  
 *           type: string
 *         required: true
 *         description: user id
 *         example: 683076867056a9cec8965873
 *     responses:
 *       200:
 *         desription: user found
 *         content: 
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     description: username
 *                     example: userName_1
 *                   email:
 *                     type: string
 *                     description: user email
 *                     example: example@gmail.com
 *       404:
 *         $ref: '#/components/responses/404'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 */
UsersRouter.get('/info/:id', UsersController.getInfo);

// убрать
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

/**
 * @swagger
 * /users/recover:
 *   patch:
 *     summary: create token to change password
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: user login
 *                 example: userName_1
 *     responses:
 *       200:
 *         description: user found
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: boolean
 *                     desription: user found
 *                     example: true
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
UsersRouter.patch('/recover', UsersController.recover);

/**
 * @swagger
 * /users/changePass:
 *   patch:
 *     summary: change password by token
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: new user password
 *               email:
 *                 type: string
 *                 description: user email
 *                 example: example@gmail.com
 *     responses:
 *       200:
 *         description: password recovered
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   result: 
 *                     type: boolean
 *                     description: password changed
 *                     example: true
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 */
UsersRouter.patch('/changePassword', UsersController.changePass);

/**
 * @swagger
 * /users/changeName:
 *   patch:
 *     summary: can change username
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newName:
 *                 type: string
 *                 description: new username
 *                 example: userName_1
 *               email:
 *                 type: string
 *                 description: user email
 *                 example: example@gmail.com
 *     responses:
 *       200:
 *         description: username changed
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: boolean
 *                     description: username changed
 *                     example: true
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
UsersRouter.patch('/changeName', UsersController.changeName);

/**
 * @swagger
 * /user/payment:
 *   patch:
 *     summary: change order status
 *     tags: [users, orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: ordeer id
 *                 example: 68175a242850f6c7aeb2add1
 *               status:
 *                 type: number
 *                 description: new order status
 *                 example: 1
 *     responses:
 *       200:
 *         description: order status changed
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: string
 *                     description: result about operation
 *                     example: true
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
UsersRouter.patch('/payment', UsersController.payment);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: delete user by id
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     responses:
 *       200:
 *         desription: user deleted
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: boolean
 *                     description: result about operaion
 *                     example: true
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */