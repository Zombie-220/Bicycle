import CryptoJS from 'crypto-js';

import { AES_KEY } from '../config/env.js';
import { ObjectId } from 'mongodb';

/**
 * @param {string | number | any[] | boolean | object | ObjectId} data 
 * @returns {string | string[] | object}
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
    
    else if (typeof(data) === 'object' && data !== null) {
        var encryptedObj = {};
        for (let key of Object.keys(data)) {
            encryptedObj[key] = Encrypt(data[key]);
        }
        return encryptedObj;
    } else { return (data); }
}

/**
 * @param {string | number | any[] | object} data
 * @returns {string | number | any[] | object}
*/
export const Decrypt = (data) => {
    if (typeof(data) === 'string') {
        let decryptedData = CryptoJS.AES.decrypt(`${data}`.replace(/\ /g, '+'), AES_KEY).toString(CryptoJS.enc.Utf8);
        if (!isNaN(Number(data))) { return (Number(decryptedData)); }
        else if (decryptedData === 'true') { return (true); }
        else if (decryptedData === 'false') { return (false); }
        else { return (decryptedData); }
    }

    else if (Array.isArray(data)) {
        const decryptedArray = data.map((data) => {
            return (Decrypt(data));
        });
        return decryptedArray;
    }

    else if (typeof(data) === 'object' && data !== null) {
        var decryptedObj = {};
        for (let key of Object.keys(data)) {
            decryptedObj[key] = Decrypt(data[key]);
        }
        return decryptedObj;
    }

    else { return (data); }
}