import { request, response } from "express";

import { PORT } from "../config/env.js";
import { Decrypt, Encrypt } from "../helpers/encryption.js";
import { UsersService } from '../services/users.js';
import { Logger } from "../config/logger/logger.js";

import { Error400, Error403, Error422, Error500 } from "../helpers/statusCode.js";
import { UsersModel } from "../models/users.js";

export const UsersController = {
    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {Promise<void>}
     */
    login: async function(req, res) {
        try {
            if (req.headers.referer === `http://localhost:${PORT}/docs/` || req.headers.referer === `https://localhost:${PORT}/docs/`) {
                if (req.body.name === 'name_user_1' && req.body.password === 'pass_user_1') {
                    res.json({
                        id: '682afe52d4002b96bea855fa',
                        roles: ['user'],
                        token: req.body.token ? 'some symbols as token' : null
                    });
                    Logger.debug(`${req.method} ${req.baseUrl}${req.url}: get user by id from swagger`);
                } else {
                    Error403(res);
                    Logger.debug(`${req.method} ${req.baseUrl}${req.url}: attempt to get another user from swagger`, req.body);
                }
            } else {
                if (req.body.name && req.body.password && req.body.token) {
                    const loginUser = await UsersService.login(req.body.name, req.body.password, req.body.token);

                    if (loginUser) {
                        Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
                        res.json(loginUser);
                    } else {
                        Error422(res);
                        Logger.warn(`${req.method} ${req.baseUrl}${req.url}: wrong data`, Decrypt(req.body));
                    }
                } else {
                    Error400(res);
                    Logger.warn(`${req.method} ${req.baseUrl}${req.url}: not enough data`, Decrypt(req.body));
                }
            }
        } catch (err) {
            Error500(res);
            Logger.crit(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`, Decrypt(req.body));
        }
    },

    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {Promise<void>}
    */
    register: async function(req, res) {
        try {
            if (req.headers.referer === `http://localhost:${PORT}/docs/` || req.headers.referer === `https://localhost:${PORT}/docs/`) {
                if (req.body.name && req.body.password && req.body.email) {
                    if (req.body.name.substring(req.body.name.length - 8) === '_swagger') {
                        const newUser = await UsersModel.addUser(req.body.name, req.body.password, req.body.email);
                        res.json({
                            id: newUser.toString(),
                            roles: ['user'],
                            token: 'some symbols as token'
                        });
                        Logger.debug(`${req.method} ${req.baseUrl}${req.url}: register success`);
                    } else {
                        Error403(res, 'need (_swagger) at the end');
                        Logger.debug(`${req.method} ${req.baseUrl}${req.url}: wrong name`, req.body);
                    }
                } else {
                    Error400(res);
                    Logger.debug(`${req.method} ${req.baseUrl}${req.url}: not enough data`, req.body);
                }
            } else {
                if (req.body.name && req.body.password && req.body.email) {
                    const newUserInfo = await UsersService.register(req.body.name, req.body.password, req.body.email);
                    res.json(newUserInfo);
                    Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
                } else {
                    Error400(res);
                    Logger.warn(`${req.method} ${req.baseUrl}${req.url}: not enough data`, Decrypt(req.body));
                }
            }
        } catch (err) {
            if (err.code === 11000) {
                Error422(res);
                Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
            } else {
                Error500(res);
                Logger.crit(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`, Decrypt(req.body));
            }
        }
    },

    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {Promise<void>}
    */
    recover: async function(req, res) {
        try {
            const resp = await UsersService.recover(req.body.login);

            res.json(Encrypt(resp));
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'start recover failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    changePass: async function(req, res) {
        try {
            const resp = await UsersService.changePass(req.body.newPass, req.body.email);

            res.json(Encrypt(resp));
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'change password failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    getInfo: async function(req, res) {
        try {
            const userInfo = await UsersService.getInfo(req.params.id);

            res.json(userInfo);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'change password failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    changeName: async function(req, res) {
        try {
            const userInfo = await UsersService.changeName(req.body.newName, req.body.email);

            res.json(userInfo);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'change password failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    getAllUsers: async function(req, res) {
        try {
            const allUsersInfo = await UsersService.getAllUsers();

            res.json(allUsersInfo);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'get all users failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    payment: async function(req, res) {
        try {
            const userPayment = await UsersService.payment(req.body);
            console.log()
            res.json(userPayment);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'payment failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    }
}