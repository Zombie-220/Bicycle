import { Router } from 'express';
import { UsersController } from '../controller/users.js';

export const UsersRouter = Router();

UsersRouter.post('/login', UsersController.login);
UsersRouter.post('/register', UsersController.register);
UsersRouter.post('/recover', UsersController.recover);