import dotenv from 'dotenv';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

import { __dirname } from '../helpers/__dirname.js';

dotenv.config({
    path: resolve(__dirname, './.env')
});

/**
 * Порт backend
 * @type {number}
*/
export const PORT = process.env.PORT;

/**
 * Порт frontend
 * @type {number}
*/
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

/**
 * SSL ключ
 * @type {string | null}
*/
export const PRIVATE_KEY = existsSync(path.join(__dirname, 'no_pass_key.key')) ? readFileSync(path.join(__dirname, 'no_pass_key.key'), 'utf-8') : null;
/**
 * SSL сертификат
 * @type {string | null}
*/
export const CERTIFICATE = existsSync(path.join(__dirname, 'cert.crt')) ? readFileSync(path.join(__dirname, 'cert.crt'), 'utf-8') : null;

/**
 * Ключ AES шифрования
 * @type {string}
*/
export const AES_KEY = process.env.AES_KEY;

/** 
 * Ключ токена
 * @type {string}
*/
export const TOKEN_KEY = process.env.TOKEN_KEY;