import { Router } from "express";

import { EquipmentsCotroller } from '../controller/equipments.js';

export const EquipmentsRouter = Router();

EquipmentsRouter.get('/amount/:amount?', EquipmentsCotroller.byAmount);
EquipmentsRouter.get('/catalog-menu', EquipmentsCotroller.catalogMenu);
EquipmentsRouter.post('/change', EquipmentsCotroller.change);
EquipmentsRouter.get('/:id', EquipmentsCotroller.getById);