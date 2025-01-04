import { Router } from 'express';
import { CreateUser_C } from '../controller/users.js';
import { APP } from '../main.js';

export const UsersRouter = Router();

UsersRouter.post('/add', CreateUser_C);

// UsersRouter.post('/login', async (req, res) => {
//     try {
//         const findUserByName = await UserCollection.findOne({ name: req.body.name });
//         if (findUserByName != null) {
//             if (findUserByName.password == req.body.password) {
//                 if (req.body.getToken) {
//                     let userRoles = '';
//                     findUserByName.roles.map((data) => { userRoles += `${data}.`; })
//                     res.json({ id: findUserByName._id, token: `${findUserByName._id}|${findUserByName.name}|${userRoles.slice(0, -1)}` }); }
//                 else { res.json({ id: findUserByName._id }); }
//             }
//             else { res.json({ message: 'Invalid username or password' }); }
//         } else { res.json({ message: 'Invalid username or password' }); }

//         logger.info(`${req.method} ${req.baseUrl}${req.url}`);
//     } catch (err) {
//         res.status(500).json({ message: 'Something went wrong @_@' });
//         logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
//     }
// });

// UsersRouter.post('/checkName', async (req, res) => {
//     try {
//         const findUserByName = await UserCollection.findOne({ name: req.body.name });

//         if (findUserByName != null) { res.json({ message: true }); }
//         else { res.json({ message: false }); }

//         logger.info(`${req.method} ${req.baseUrl}${req.url}`);
//     } catch (err) {
//         res.status(500).json({ message: 'Something went wrong @_@' });
//         logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
//     }
// });


// UsersRouter.get('/isAdmin/(:id)', async(req, res) => {
//     try {
//         const findUserById = await UserCollection.findOne({ _id: new ObjectId(req.params.id) })
        
//         if (findUserById.roles.includes("admin")) { res.json({ message: true }); }
//         else { res.json({ message: false }); }
//         logger.info(`${req.method} ${req.baseUrl}${req.url}`);
//     } catch (err) {
//         res.status(500).json({ message: 'Something went wrong @_@' });
//         logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
//     }
// });

// UsersRouter.get('/recover/(:name)', async(req, res) => {
//     try {
//         const recoverUser = await UserCollection.findOne({ name: req.params.name });

//         if (recoverUser === null) { res.json({ message: false }); }
//         else {
//             res.json({ message: 'send' });
//         }
//         logger.info(`${req.method} ${req.baseUrl}${req.url}`);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//         logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
//     }
// });