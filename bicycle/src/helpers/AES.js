import CryptoJS from 'crypto-js';

/**
 * @param {string | number} data значение для зашифровки
 * @returns {string}
*/
export const Encrypt = (data) => { return CryptoJS.AES.encrypt(`${data}`, process.env.REACT_APP_AES_KEY).toString(); }

/**
 * @param {string | number | string[] | number[] | object} data зашифрованное значение для расшифровки
 * @returns {string | number | string[] | number[] | object}
*/
export const Decrypt = (data) => {
    if (typeof(data) === 'string' || typeof(data) === 'number') {
        var decryptedData = CryptoJS.AES.decrypt(`${data}`.replace(/\ /g, '+'), process.env.REACT_APP_AES_KEY).toString(CryptoJS.enc.Utf8);
        if (!isNaN(Number(decryptedData))) { return Number(decryptedData); }
        else { return (decryptedData); }
    }

    else if (Array.isArray(data)) {
        const decryptedArray = data.map((data) => {
            return (Decrypt(data));
        });
        return decryptedArray;
    }

    else if (typeof(data) === 'object') {
        var decryptedObj = {};
        for (let key of Object.keys(data)) {
            decryptedObj[key] = Decrypt(data[key]);
        }
        return decryptedObj;
    }
    
    else { return (data); }
}