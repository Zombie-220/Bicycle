import CryptoJS from 'crypto-js';

import { AES_KEY } from '../config/env.js';

/**
 * @param {string | number | object} data 
 * @returns {string}
*/
export const Encrypt = (data) => {
    if (typeof(data) === 'string' || typeof(data) === 'number') {
        return CryptoJS.AES.encrypt(`${data}`, AES_KEY).toString();
    }
    
    else if (typeof(data) === 'object') {
        var encryptedObj = {};
        for (let key of Object.keys(data)) {
            encryptedObj[key] = CryptoJS.AES.encrypt(`${data[key]}`, AES_KEY).toString();
        }
        return encryptedObj;
    }
}

/**
 * @param {string | number} data 
 * @returns {string} 
*/
export const Decrypt = (data) => { return CryptoJS.AES.decrypt(`${data}`.replace(/\ /g, '+'), AES_KEY).toString(CryptoJS.enc.Utf8); }