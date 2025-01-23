import { DB } from "../config/database/database.js";

/**
 * @typedef {object} Equipment
 * @property {string} _id
 * @property {string} name
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
    }
}