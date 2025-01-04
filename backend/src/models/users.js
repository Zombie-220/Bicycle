import { DB } from "../config/database/database.js";

const usersCollection = DB.collection('users');

export const CreateUser_M = async (userData) => {
    const result = await usersCollection.insertOne({ ...userData, roles: ['user'] });
    return result.insertedId;
}

export const FindUsername_M = async (username) => {
    const id = await usersCollection.findOne({ name: username });
    return id ? id._id : null;
}

export const GetUserPass_M = async (username, password) => {
    const userPass = await usersCollection.findOne({ name: username, password: password });
    return userPass ? userPass._id : false;
}