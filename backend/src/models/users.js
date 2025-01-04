import { DB } from "../config/database/database.js";

const usersCollection = DB.collection('users');

export const CreateUser_M = async (userData) => {
    const result = await usersCollection.insertOne({ ...userData, roles: ['user'] });
    return result.insertedId;
}