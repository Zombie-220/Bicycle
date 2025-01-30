import { ObjectId } from "mongodb";

import { CreateToken } from "../helpers/token.js";
import { UsersModel } from '../models/users.js';
import { Decrypt, Encrypt } from "../helpers/encryption.js";

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
            token: (user ? (await CreateToken(user._id, user.roles, (_getToken ? 168 : 24))) : null)
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
    }
}