import CryptoJS from 'crypto-js';

/**
 * @param {string | number | boolean | any[] | object} data
 * @returns {string | string[] | object}
*/
export const Encrypt = (data) => {
    if (typeof(data) === 'string' || typeof(data) === 'number' || typeof(data) === 'boolean') {
        return CryptoJS.AES.encrypt(`${data}`, process.env.REACT_APP_AES_KEY).toString();
    }

    else if (Array.isArray(data)) {
        const encryptedArray = data.map((data) => {
            return(Encrypt(data));
        });
        return encryptedArray;
    }

    else if (typeof(data) === 'object' && data !== null) {
        let encryptedObj = {};
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
        var decryptedData = CryptoJS.AES.decrypt(`${data}`.replace(/\ /g, '+'), process.env.REACT_APP_AES_KEY).toString(CryptoJS.enc.Utf8);
        if (!isNaN(Number(decryptedData))) { return Number(decryptedData); }
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