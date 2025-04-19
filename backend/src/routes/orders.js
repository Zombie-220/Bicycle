import { Router } from "express";

import { OrdersController } from '../controller/orders.js';

export const OrdersRouter = Router();

OrdersRouter.get('/all', OrdersController.getAll);
OrdersRouter.post('/createOrder', OrdersController.createOrder);
OrdersRouter.post('/deleteItem', OrdersController.deleteItem);
OrdersRouter.get('/getOrder/:id', OrdersController.getOrder);
OrdersRouter.post('/updateStatus', OrdersController.updateStatus);