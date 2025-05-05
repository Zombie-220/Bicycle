import { ObjectId } from "mongodb";
import { DB } from "../config/database/database.js";

/**
    * @typedef {object} Part
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

const partsCollection = DB.collection('parts');

export const PartsModel = {
    byAmount: async function(amount) {
        const parts = partsCollection.find().limit(amount).toArray();
        return parts;
    },

    orderBy: async function(field, summ) {
        const pipeline = [{$group: { _id: `$${field}`, totalQuantity: { $sum: `$${summ}` }}},
            {$project : { _id: 0, field: '$_id', summ: '$totalQuantity' }}];

        const result = await partsCollection.aggregate(pipeline).toArray();
        return result;
    },

    getById: async function(id) {
        const part = await partsCollection.findOne({ _id: id });
        return part;
    },

    update: async function(newItem, id) {
        const updatedBicycle = await partsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: newItem }
        );
        return updatedBicycle.modifiedCount;
    }
};