import { Router } from "express";

import { OrdersController } from '../controller/orders.js';

export const OrdersRouter = Router();

OrdersRouter.post('/createOrder', OrdersController.createOrder);
// OrdersRouter.get('/getOrder/:id', OrdersController.getOrder);