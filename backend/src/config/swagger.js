import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { __dirname } from '../helpers/__dirname.js';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API docs',
            version: '1.0.0',
            description: 'REST API documentation for "World Bike"'
        },
    },
    apis: [`${__dirname}/src/routes/*.js`, `${__dirname}/src/models/*.js`, `${__dirname}/src/config/swagger.js`]
};

const specs = swaggerJsdoc(options);

export const SwaggerSetup = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
}

/**
 * @swagger
 * components:
 *   responses:
 *     400:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: error message
 *                 example: bad request
 *               error:
 *                 type: string
 *                 description: short error message
 *                 example: badRequest
 * 
 *     403:
 *       description: Forbidden
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: error message
 *                 example: server refuse to answer
 *               error:
 *                 type: string
 *                 description: short error message
 *                 example: forbidden
 * 
 *     404:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: error message
 *                 example: resource not found
 *               error:
 *                 type: string
 *                 description: short error message
 *                 example: notFound
 * 
 *     422:
 *       description: Unprocessable Entity
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: error message
 *                 example: name is already exists
 *               error:
 *                 type: object
 *                 description: short error message
 *                 example: dataBusy
 * 
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: server error message
 *                 example: internal server error
 *               error:
 *                 type: object
 *                 description: short error message
 *                 example: internalErr
 */