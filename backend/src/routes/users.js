import { Router } from 'express';
import { CreateUser_C, FindUsername_C, LoginUser_C } from '../controller/users.js';

export const UsersRouter = Router();

UsersRouter.get('/findByName/:name', FindUsername_C);
UsersRouter.post('/add', CreateUser_C);
UsersRouter.post('/login', LoginUser_C);