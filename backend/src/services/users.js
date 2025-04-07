import { ObjectId } from "mongodb";

import { CreateToken } from "../helpers/token.js";
import { UsersModel } from '../models/users.js';
import { Decrypt, Encrypt } from "../helpers/encryption.js";
import { SendRecoverCode } from "../helpers/mail.js";
import { RecoverToken } from '../helpers/token.js';

export const UsersService = {
    /**
     * @param {string} name
     * @param {string} password
     * @param {string} getToken
     * @returns {Promise<{id: string, token: string}>}
    */
    login: async function(name, password, getToken) {
        const _name = Decrypt(name);
        const _password = Decrypt(password);
        const _getToken = Decrypt(getToken);

        const user = await UsersModel.getInfoByNameAndPass(_name, _password);

        return ({
            id: (user ? Encrypt(user._id) : null),
            token: (user ? (CreateToken(user._id, user.roles, (_getToken ? 168 : 24))) : null)
        });
    },


    /**
     * @param {string} name 
     * @param {string} password 
     * @param {string} email
     * @returns {Promise<ObjectId | null>}
    */
    register: async function(name, password, email) {
        const _name = Decrypt(name);
        const _password = Decrypt(password);
        const _email = Decrypt(email);

        if (!(await UsersModel.checkByName(_name))) {
            const newId = await UsersModel.addUser(_name, _password, _email);
            return { id: Encrypt(newId) };
        } else {
            return { id: Encrypt(null) };
        }
    },

    /**
     * @param {string} login 
     * @returns {Promise<{response: string}>}
    */
    recover: async function(login) {
        const _login = Decrypt(login);
        const findUser = await UsersModel.getInfoByLogin(_login);

        if (findUser) {
            const CTT = new Date();
            const token = RecoverToken(findUser.email);
            const userInfo = await UsersModel.createRecoverToken(_login, token);
            SendRecoverCode(findUser.email, token);
            return { response: 'go next' };
        } else { return { response: 'user not found' };}
    },

    changePass: async function(password, email) {
        await UsersModel.changePass(`${password}`, `${email}`);
        return { resp: 'password changed' };
    },

    getInfo: async function(id) {
        const userInfo = await UsersModel.getInfoById(new ObjectId(id));
        return {
            username: userInfo.name,
            email: userInfo.email
        };
    },

    changeName: async function(name, email) {
        await UsersModel.changeName(name, email);
        return { resp: 'name changed' };
    }
}