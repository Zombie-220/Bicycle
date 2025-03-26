import dotenv from 'dotenv';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

import { __dirname } from '../helpers/__dirname.js';

dotenv.config({ path: resolve(__dirname, './.env') });

/** * @type {number} */
export const PORT = process.env.PORT;

/** * @type {number} */
export const FRON_PORT = process.env.FRONT_PORT;

/**
 * @typedef {Objest} DATABASE_INFO
 * @property {number} DATABASE_INFO.port
 * @property {string} DATABASE_INFO.root
 * @property {string} DATABASE_INFO.pass
*/
export const DATABASE_INFO = {
    port: process.env.DATABASE_PORT,
    root: process.env.DATABASE_ROOT,
    pass: process.env.DATABASE_PASS
}

/** * @type {string | null} */
export const PRIVATE_KEY = existsSync(path.join(__dirname, 'no_pass_key.key')) ? readFileSync(path.join(__dirname, 'no_pass_key.key'), 'utf-8') : null;
/** * @type {string | null} */
export const CERTIFICATE = existsSync(path.join(__dirname, 'cert.crt')) ? readFileSync(path.join(__dirname, 'cert.crt'), 'utf-8') : null;

/** * @type {string} */
export const AES_KEY = process.env.AES_KEY;

/** * @type {string} */
export const TOKEN_KEY = process.env.TOKEN_KEY;

/** * @type {string} */
export const SMTP_ADDRESS = process.env.SMTP_ADDRESS;
/** * @type {number} */
export const SMTP_PORT = process.env.SMTP_PORT;
/** * @type {string} */
export const EMAIL = process.env.EMAIL;
/** * @type {string} */
export const EMAIL_PASS = process.env.EMAIL_PASS;