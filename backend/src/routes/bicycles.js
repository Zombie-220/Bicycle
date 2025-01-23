import { Router } from "express";

import { BicyclesController } from "../controller/bicycles.js";

export const BicyclesRouter = Router();

BicyclesRouter.get('/amount/:amount?', BicyclesController.getByAmount);
BicyclesRouter.get('/latest/:amount?', BicyclesController.getLatest);
BicyclesRouter.get('/orderBy', BicyclesController.orderBy);
BicyclesRouter.get('/:id', BicyclesController.getById);