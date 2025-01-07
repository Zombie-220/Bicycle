import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import { TOKEN_KEY } from '../config/env.js';
import { GetUserInfo } from '../models/users.js';

/**
 * @param {ObjectId} id 
*/
export const CreateToken = async (id) => {
    const userInfo = await GetUserInfo(id);
    const token = jwt.sign({ name: userInfo.name, id: userInfo._id }, TOKEN_KEY, { expiresIn: 168 });
    return (token);
}