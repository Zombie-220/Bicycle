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
*/

export const UsersModel = {
    /**
     * @param {ObjectId} id 
     * @returns {Promise<User>}
    */
    getInfoById: async function(id) {
        const userInfo = await usersCollection.findOne({ _id: id });
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
    }
}