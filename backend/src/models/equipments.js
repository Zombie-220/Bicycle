import { ObjectId } from "mongodb";

import { DB } from "../config/database/database.js";

/**
 * @typedef {object} Equipment
 * @property {string} _id
 * @property {string} name
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
    }
}