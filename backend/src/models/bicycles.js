import { DB } from "../config/database/database.js";
import { logger } from "../config/logger/logger.js";

const bicyclesCollection = DB.collection('bicycles');

/**
 * @param {string} amount 
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

export const GetAllBicycles = async () => {
    const result = await bicyclesCollection.find({}).toArray();
    return result;
}

export const GetBicyclesOrderBy_M = async (field, summ) => {
    const pipeline = [{
            $group: {
                _id: `$${field}`,
                totalQuantity: { $sum: `$${summ}` }
            }
        },
        {
            $project : {
                _id: 0,
                field: '$_id',
                summ: '$totalQuantity'
            }
        }
    ];

    const result = await bicyclesCollection.aggregate(pipeline).toArray();
    return result;
}