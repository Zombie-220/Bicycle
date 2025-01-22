import { Router } from "express";
import { GetBicyclesOrderBy_C, getBicycleById_C } from '../controller/bicycles.js';

import { BicyclesController } from "../controller/bicycles.js";

export const BicyclesRouter = Router();

BicyclesRouter.get('/amount/:amount?', BicyclesController.getByAmount);
BicyclesRouter.get('/latest/:amount?', BicyclesController.getLatest);
BicyclesRouter.get('/orderBy', GetBicyclesOrderBy_C);
BicyclesRouter.get('/:id', getBicycleById_C);