import { ObjectId } from "mongodb";

import { DB } from "../config/database/database.js";

const usersCollection = DB.collection('users');

/**
 * @param {string} name
 * @returns {Promise<ObjectId | null>}
*/
export const CheckUserByName = async (name) => {
    const userId = await usersCollection.findOne({ name: name });
    return userId ? userId._id : null;
}

/**
 * 
 * @param {{ name: string, password: string, email: string }} userData
 * @returns {Promise<ObjectId>}
*/
export const RegisterNewUser = async (userData) => {
    const newUserId = await usersCollection.insertOne({ ...userData, roles: ['user'] });
    return newUserId.insertedId;
}

/**
 * @param {string} name 
 * @param {string} password 
 * @returns {Promise<ObjectId | null>}
*/
export const LoginUserByName = async (name, password) => {
    const user = await usersCollection.findOne({ name: name, password: password });
    return user ? user._id : null;
}

/**
 * @param {string} id 
 * @returns {Promise<[string]>}
*/
export const GetUserRoles = async (id) => {
    const roles = await usersCollection.findOne({ _id: new ObjectId(id) });
    return roles.roles;
}

/**
 * @param {string} id 
 * @returns {Promise<{_id: ObjectId, name: string, password: string, roles: [string], email: string}>}
 */
export const GetUserInfo = async (id) => {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    return user;
}