import CryptoJS from 'crypto-js';

/**
 * @param {string} data 
 * @returns {string}
*/
export const Encrypt = (data) => { return CryptoJS.AES.encrypt(data, process.env.REACT_APP_AES_KEY).toString(); }

/**
 * @param {string} data 
 * @returns {string} 
*/
export const Decrypt = (data) => { return CryptoJS.AES.decrypt(data, process.env.REACT_APP_AES_KEY).toString(CryptoJS.enc.Utf8); }