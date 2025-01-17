import { Router } from "express";
import { GetBicyclesByAmount_C, GetBicyclesOrderBy_C, getBicycleById_C } from '../controller/bicycles.js';

export const BicyclesRouter = Router();

BicyclesRouter.get('/amount/(:amount)', GetBicyclesByAmount_C);
BicyclesRouter.get('/orderBy', GetBicyclesOrderBy_C);
BicyclesRouter.get('/:id', getBicycleById_C);