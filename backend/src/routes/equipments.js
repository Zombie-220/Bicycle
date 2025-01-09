import { Router } from "express";

import { GetEquipmentByAmount_C } from '../controller/equipments.js';

export const EquipmentsRouter = Router();

EquipmentsRouter.get('/amount/:amount', GetEquipmentByAmount_C);