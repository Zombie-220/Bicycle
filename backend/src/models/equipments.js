import { ObjectId } from "mongodb";

import { DB } from "../config/database/database.js";

/**
 * @typedef {object} Equipment
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

const equipmentCollection = DB.collection('equipments');

export const EquipmentsModel = {
    /**
     * @param {number} amount 
     * @returns {Promise<Equipment[]>}
    */
    byAmount: async function(amount) {
        const equipments = await equipmentCollection.find().limit(amount).toArray();
        return equipments;
    },

    /**
     * @param {ObjectId} id 
     * @returns {Promise<Equipment>}
    */
    getById: async function(id) {
        const equipment = await equipmentCollection.findOne({ _id: id });
        return equipment
    },

    orderBy: async function(field, summ) {
        const pipeline = [{$group: { _id: `$${field}`, totalQuantity: { $sum: `$${summ}` }}},
            {$project : { _id: 0, field: '$_id', summ: '$totalQuantity' }}];

        const result = await equipmentCollection.aggregate(pipeline).toArray();
        return result;
    },

    update: async function(newItem, id) {
        const updatedBicycle = await equipmentCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: newItem }
        );
        return updatedBicycle.modifiedCount;
    }
}