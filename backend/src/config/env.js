import dotenv from 'dotenv';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

import { __dirname } from '../helpers/__dirname.js';

dotenv.config({
    path: resolve(__dirname, './.env')
});

export const PORT = process.env.PORT;

export const DATABASE_INFO = {
    port: process.env.DATABASE_PORT,
    root: process.env.DATABASE_ROOT,
    pass: process.env.DATABASE_PASS
}

export const PRIVATE_KEY = existsSync(path.join(__dirname, 'no_pass_key.key')) ? readFileSync(path.join(__dirname, 'no_pass_key.key'), 'utf-8') : null;
export const CERTIFICATE = existsSync(path.join(__dirname, 'cert.crt')) ? readFileSync(path.join(__dirname, 'cert.crt'), 'utf-8') : null;

export const AES_KEY = process.env.AES_KEY;

export const TOKEN_KEY = process.env.TOKEN_KEY;