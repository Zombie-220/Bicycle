import { Router } from 'express';

import { AccessoriesController } from '../controller/accessories.js';

export const AccessoriesRouter = Router();

AccessoriesRouter.get('/amount/:amount?', AccessoriesController.byAmount);
AccessoriesRouter.get('/catalog-menu', AccessoriesController.catalogMenu);
AccessoriesRouter.post('/change', AccessoriesController.change);
AccessoriesRouter.get('/:id', AccessoriesController.getById);