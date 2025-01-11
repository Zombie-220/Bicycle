import { Router } from "express";
import { GetBicyclesByAmount_C, GetBicycleCategories_C } from '../controller/bicycles.js';

export const BicyclesRouter = Router();

BicyclesRouter.get('/amount/(:amount)', GetBicyclesByAmount_C);
BicyclesRouter.get('/categories', GetBicycleCategories_C);