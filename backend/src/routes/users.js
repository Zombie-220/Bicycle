import { Router } from 'express';
import { CheckUser, RegisterUser, LoginUser } from '../controller/users.js';

export const UsersRouter = Router();

UsersRouter.get('/check', CheckUser);
UsersRouter.post('/register', RegisterUser);
UsersRouter.post('/login', LoginUser);