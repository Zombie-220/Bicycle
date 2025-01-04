import { DB } from "../config/database/database.js";
import { logger } from "../config/logger/logger.js";

const bicyclesCollection = DB.collection('bicycles');

/**
 * @param {*} amount 
 * @returns 
*/
export const GetBicyclesByAmount_M = async (amount) => {
    try {
        const result = await bicyclesCollection.find().limit(parseInt(amount)).toArray();
        return result;
    } catch (err) {
        logger.crit('GetBicyclesByAmount failed at models');
    }
}