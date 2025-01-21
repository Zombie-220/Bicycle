import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import { TOKEN_KEY } from '../config/env.js';
import { GetUserInfo } from '../models/users.js';

/**
 * Функция по созданию токена, включающего в себя:
 * - name - имя пользователя
 * - id - ID пользователя
 * @param {ObjectId} id ID пользоваиеля
 * @returns {Promise<string>}
*/
export const CreateToken = async (id) => {
    const userInfo = await GetUserInfo(id);
    const token = jwt.sign({ name: userInfo.name, id: userInfo._id }, TOKEN_KEY, { expiresIn: 168 });
    return (token);
}