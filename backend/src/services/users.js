import { RegisterNewUser } from "../models/users.js";

import { Decrypt_front, Encryp_front } from "../helpers/encryption.js";

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