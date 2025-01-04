import { Router } from "express";
import { GetBicyclesByAmount_C } from '../controller/bicycles.js';

export const BicyclesRouter = Router();

BicyclesRouter.get('/amount/(:amount)', GetBicyclesByAmount_C);