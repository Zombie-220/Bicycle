import { Router } from "express";

import { EquipmentsCotroller } from '../controller/equipments.js';

export const EquipmentsRouter = Router();

EquipmentsRouter.get('/amount/:amount', EquipmentsCotroller.byAmount);
EquipmentsRouter.get('/:id', EquipmentsCotroller.getById);