import CryptoJS from 'crypto-js';

/**
 * @param {string | number} data значение для зашифровки
 * @returns {string}
*/
export const Encrypt = (data) => { return CryptoJS.AES.encrypt(`${data}`, process.env.REACT_APP_AES_KEY).toString(); }

/**
 * @param {string} data зашифрованное значение для расшифровки
 * @returns {string} 
*/
export const Decrypt = (data) => { return CryptoJS.AES.decrypt(data.replace(/\ /g, '+'), process.env.REACT_APP_AES_KEY).toString(CryptoJS.enc.Utf8); }