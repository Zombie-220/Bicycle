import dotenv from 'dotenv';
import { resolve } from 'path';

import { __dirname } from '../helpers/__dirname.js';

dotenv.config({
    path: resolve(__dirname, './.env')
});

export const PORT = process.env.PORT;
export const DATABASE_PORT = process.env.DATABASE_PORT;
