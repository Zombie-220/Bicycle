import { DB } from '../config/database/database.js';

/**
 * @typedef {object} Accessorie
 * @property {ObjectId} _id
 * @property {string} brand
 * @property {string} model
 * @property {string} productImage
 * @property {number} price
 * @property {string[]} size
 * @property {string[]} color
 * @property {number} amount
 * @property {number} discount
*/

const accesoriesCollection = DB.collection('accessories');

export const AccessoriesModel = {
    getById: async function(id) {
        const accessorie = await accesoriesCollection.findOne({ _id: id });
        return accessorie;
    },

    byAmount: async function(amount) {
        const accessories = await accesoriesCollection.find().limit(amount).toArray();
        return accessories;
    },

    orderBy: async function(field, summ) {
        const pipeline = [{$group: { _id: `$${field}`, totalQuantity: { $sum: `$${summ}` }}},
            {$project : { _id: 0, field: '$_id', summ: '$totalQuantity' }}];

        const result = await accesoriesCollection.aggregate(pipeline).toArray();
        return result;
    }
};