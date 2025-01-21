import CryptoJS from 'crypto-js';

import { AES_KEY } from '../config/env.js';

/**
 * @param {string | number} data 
 * @returns {string}
*/
export const Encryp = (data) => { return CryptoJS.AES.encrypt(`${data}`, AES_KEY).toString(); }

/**
 * @param {string | number} data 
 * @returns {string} 
*/
export const Decrypt = (data) => { return CryptoJS.AES.decrypt(`${data}`.replace(/\ /g, '+'), AES_KEY).toString(CryptoJS.enc.Utf8); }