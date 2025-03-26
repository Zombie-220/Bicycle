import jwt from 'jsonwebtoken';

import { TOKEN_KEY } from '../config/env.js';

/**
 * Функция по созданию токена, включающего в себя:
 * @param {string} id ID пользователя
 * @param {string[]} roles роли пользователя
 * @param {number} expires срок жизни токена (в часах)
 * 
 * @returns {string}
*/
export const CreateToken = (id, roles, expires) => {
    const token = jwt.sign({
        id: `${id}`,
        roles: roles
    }, TOKEN_KEY, { expiresIn: `${expires}hr` });
    
    return (token);
}

/**
 * @param {string} email 

 * @returns {string}
*/
export const RecoverToken = (email) => {
    const token = jwt.sign({ email: email }, TOKEN_KEY, { expiresIn: '10m' });

    return (token);
}