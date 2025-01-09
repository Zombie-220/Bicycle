import { DB } from "../config/database/database.js";
import { logger } from "../config/logger/logger.js";

const equipmentCollection = DB.collection('equipments');

export const GetEquipmentByAmount_M = async (amount) => {
    try {
        const result = await equipmentCollection.find().limit(parseInt(amount)).toArray();
        return result;
    } catch (err) {
        logger.crit('GetBicyclesByAmount failed at models');
    }
}