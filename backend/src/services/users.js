import { LoginUserByName, RegisterNewUser } from "../models/users.js";
import { Decrypt, Encryp } from "../helpers/encryption.js";
import { CreateToken } from "../helpers/token.js";

/**
 * @param {{ name: string, password: string, email: string }} userData
 * @returns {Promise<ObjectId>}
*/
export const RegisterUser_S = async (userData) => {
    const encryptedData = {
        name: Decrypt(userData.name),
        email: Decrypt(userData.email),
        password: Decrypt(userData.password)
    };

    return Encryp(`${await RegisterNewUser(encryptedData)}`);
}

/**
 * @param {{name: string, password: string, getToken: boolean}} dataFromUser
 * @returns {Promise<{id: string} | {id: string, token: string}>}
*/
export const LoginUser_S = async (dataFromUser) => {
    const userId = await LoginUserByName(dataFromUser.name, dataFromUser.password);

    if (userId) {   
        if (dataFromUser.getToken) {
            return [userId];
        } else { return ({ id: Encryp_front(`${userId}`) }); }
    } else {

    }
    
}