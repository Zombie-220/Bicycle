import CryptoJS from 'crypto-js';

import { AES_KEY } from '../config/env.js';

/**
 * @param {string} data 
 * @returns {string}
*/
export const Encryp_front = (data) => { return CryptoJS.AES.encrypt(data, AES_KEY).toString(); }

/**
 * @param {string} data 
 * @returns {string} 
*/
export const Decrypt_front = (data) => { return CryptoJS.AES.decrypt(data.replace(/\ /g, '+'), AES_KEY).toString(CryptoJS.enc.Utf8); }

// /**
//  * @param {string} data 
//  * @returns {string}
// */
// export const Encrypt_DB = (data) => { return CryptoJS.AES.encrypt(data, AES_KEY_DB).toString(); }

// /**
//  * @param {string} data 
//  * @returns {string} 
// */
// export const Decrypt_DB = (data) => { return CryptoJS.AES.decrypt(data, AES_KEY_DB).toString(CryptoJS.enc.Utf8); }