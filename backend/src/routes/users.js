import { Router } from 'express';
import { UsersController } from '../controller/users.js';

export const UsersRouter = Router();

UsersRouter.get('/info/:id', UsersController.getInfo);
UsersRouter.post('/login', UsersController.login);
UsersRouter.post('/register', UsersController.register);
UsersRouter.post('/recover', UsersController.recover);
UsersRouter.post('/changePassword', UsersController.changePass);
UsersRouter.post('/changeName', UsersController.changeName);