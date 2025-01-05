import { LoginUserByName, RegisterNewUser } from "../models/users.js";
import { Decrypt_front, Encryp_front } from "../helpers/encryption.js";
import { CreateToken } from "../helpers/token.js";

/**
 * @param {{ name: string, password: string, email: string }} userData
 * @returns {Promise<ObjectId>}
*/
export const RegisterUser_S = async (userData) => {
    const encryptedData = {
        name: Decrypt_front(userData.name),
        email: Decrypt_front(userData.email),
        password: Decrypt_front(userData.password)
    };

    return Encryp_front(`${await RegisterNewUser(encryptedData)}`);
}

/**
 * @param {{name: string, password: string, getToken: boolean}} dataFromUser
 * @returns {Promise<{id: string} | {id: string, token: string}>}
*/
export const LoginUser_S = async (dataFromUser) => {
    const decryptedData = {
        name: Decrypt_front(dataFromUser.name),
        password: Decrypt_front(dataFromUser.password),
        getToken : dataFromUser.getToken
    };

    const userId = await LoginUserByName(decryptedData.name, decryptedData.password);

    if (decryptedData.getToken) {
        return ({
            id: Encryp_front(`${userId}`),
            token: Encryp_front( await CreateToken(userId))
        });
    } else { return ({ id: Encryp_front(`${userId}`) }); }

}