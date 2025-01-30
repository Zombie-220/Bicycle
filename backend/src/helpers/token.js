import jwt from 'jsonwebtoken';

import { TOKEN_KEY } from '../config/env.js';

/**
 * Функция по созданию токена, включающего в себя:
 * @param {string} id ID пользователя
 * @param {string[]} roles роли пользователя
 * @param {number} expires срок жизни токена (в часах)
 * @returns {Promise<string>}
*/
export const CreateToken = async (id, roles, expires) => {
    const token = jwt.sign({
        id: `${id}`,
        roles: roles
    }, TOKEN_KEY, { expiresIn: `${expires}hr` });
    
    return (token);
}