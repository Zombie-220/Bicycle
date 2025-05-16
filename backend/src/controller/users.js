import { request, response } from "express";

import { Decrypt, Encrypt } from "../helpers/encryption.js";
import { UsersService } from '../services/users.js';
import { Logger } from "../config/logger/logger.js";

export const UsersController = {
    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {void}
    */
    login: async function(req, res) {
        try {
            const loginUser = await UsersService.login(req.body.name, req.body.password, req.body.getToken);

            res.json(loginUser);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'login failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
        }
    },

    /**
     * @param {request} req 
     * @param {response} res 
     * @returns {void}
    */
    register: async function(req, res) {
        try {
            const newUserId = await UsersService.register(req.body.name, req.body.password, req.body.email);
    
            res.json(newUserId);
            Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
        } catch (err) {
            res.status(500).json({ message: 'create user failed' });
            Logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
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