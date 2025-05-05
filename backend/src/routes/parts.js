import { Router } from "express";

import { PartsController } from '../controller/parts.js';

export const PartsRouter = Router();

PartsRouter.get('/amount/:amount?', PartsController.byAmount);
PartsRouter.get('/catalog-menu', PartsController.catalogMenu);
PartsRouter.post('/change', PartsController.change);
PartsRouter.get('/:id', PartsController.getById);