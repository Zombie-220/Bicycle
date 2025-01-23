import CryptoJS from 'crypto-js';

import { AES_KEY } from '../config/env.js';
import { ObjectId } from 'mongodb';

/**
 * @param {string | number | string[] | number[] | object | ObjectId} data 
 * @returns {string}
*/
export const Encrypt = (data) => {
    if (typeof(data) === 'string' || typeof(data) === 'number' || ObjectId.isValid(data)) {
        return CryptoJS.AES.encrypt(`${data}`, AES_KEY).toString();
    }

    else if (Array.isArray(data)) {
        const encryptedArray = data.map((data) =>{
            return(Encrypt(data));
        });
        return encryptedArray;
    }
    
    else if (typeof(data) === 'object') {
        var encryptedObj = {};
        for (let key of Object.keys(data)) {
            encryptedObj[key] = Encrypt(data[key]);
        }
        return encryptedObj;
    } else { return(data); }
}

/**
 * @param {string | number} data 
 * @returns {string} 
*/
export const Decrypt = (data) => { return CryptoJS.AES.decrypt(`${data}`.replace(/\ /g, '+'), AES_KEY).toString(CryptoJS.enc.Utf8); }