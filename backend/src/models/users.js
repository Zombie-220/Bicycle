import { ObjectId } from "mongodb";

import { DB } from "../config/database/database.js";

const usersCollection = DB.collection('users');

/**
 * @typedef {object} User
 * @property {ObjectId} _id
 * @property {string} name
 * @property {string} password
 * @property {string[]} roles
 * @property {string} email
 * @property {string} token
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: user id
 *         name:
 *           type: string
 *           description: user name (larger than 8 characters)
 *         password:
 *           type: string
 *           description: user password
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *           description: array of user roles
 *         email:
 *           type: string
 *           description: user email
 *         token:
 *           anyOf:
 *             - type: string
 *               description: token for password recovering
 *             - type: "null"
 *               description: token can be null
 */

export const UsersModel = {
    /**
     * @param {ObjectId | number} id 
     * @returns {Promise<User>}
    */
    getInfoById: async function(id) {
        const userInfo = await usersCollection.findOne({ _id: new ObjectId(id) });
        return userInfo ? userInfo : null;
    },

    /**
     * @param {stinrg} login 
     * 
     * @returns {Promise<User>}
    */
    getInfoByLogin: async function(login) {
        const userInfo = await usersCollection.findOne({ name: login });
        return userInfo ? userInfo : null;
    },

    /**
     * @param {string} name 
     * @param {string} password 
     * @returns {Promise<User>}
    */
    getInfoByNameAndPass: async function(name, password) {
        const userInfo = await usersCollection.findOne({ name: name, password: password });
        return userInfo ? userInfo : null;
    },

    /**
     * @param {string} name 
     * @returns {Promise<boolean>}
    */
    checkByName: async function(name) {
        const user = await usersCollection.findOne({ name: name });
        return user ? true : false;
    },

    /**
     * @param {string} name 
     * @param {string} password 
     * @param {string} email 
     * @returns {Promise<ObjectId>}
    */
    addUser: async function(name, password, email) {
        const newUserId = await usersCollection.insertOne({
            name: name,
            password: password,
            email: email,
            roles: ['user']
        });
        return newUserId.insertedId;
    },

    /**
     * @param {string} login
     * @param {string} token
     * @returns {Promise<void>}
    */
    createRecoverToken: async function(login, token) {
        await usersCollection.updateOne(
            { name: login },
            { $set: { token: token } }
        );
    },

    changePass: async function(password, email) {
        await usersCollection.updateMany(
            { email: email },
            {$set: { password: password }}
        );
    },

    changeName: async function(name, email) {
        await usersCollection.updateOne(
            { email: email },
            {$set: { name: name }}
        );
    },

    getAll: async function() {
        const allUsersInfo = await usersCollection.find(
            {},
            { name: 1, email: 1, roles: 1, _id: 0 }
        ).toArray();

        return allUsersInfo;
    }
}