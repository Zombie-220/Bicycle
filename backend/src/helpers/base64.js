import fs from 'fs';

/**
 * @param {string} file
 * 
 * @returns {string}
*/
export const parseToBase64 = (file) => {
    const fileBuffer = fs.readFileSync(file);
    const base64Data = fileBuffer.toString('base64');
    return base64Data;
}