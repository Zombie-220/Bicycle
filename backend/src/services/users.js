import { LoginUserByName, RegisterNewUser } from "../models/users.js";
import { CreateToken } from "../helpers/token.js";
import { ObjectId } from "mongodb";

/**
 * @param {{ name: string, password: string, email: string }} userData
 * @returns {Promise<ObjectId>}
*/
export const RegisterUser_S = async (userData) => {
    return await RegisterNewUser(userData);
}

/**
 * @param {{name: string, password: string, getToken: boolean}} dataFromUser
 * @returns {Promise<ObjectId | null>, string, string}
*/
export const LoginUser_S = async (dataFromUser) => {
    const userId = await LoginUserByName(dataFromUser.name, dataFromUser.password);
    var token = '';
    var err = '';

    if (userId) {if (dataFromUser.getToken) { CreateToken(userId); }}
    else { err = "wrong data"; }

    return [userId, token, err];
}