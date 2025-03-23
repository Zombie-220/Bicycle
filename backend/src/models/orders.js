import { ObjectId } from "mongodb";

import { DB } from "../config/database/database.js";

/** 
 * @typedef {object} OrderInfo
 * 
 * @property {ObjectId} id
 * @property {number} amount
 * @property {string} size 
 * @property {string} color
*/

/**
 * @typedef {object} Orders
 * 
 * @property {ObjectId} _id
 * @property {OrderInfo[]} orderInfo
 * @property {string} datetime
 * @property {ObjectId} userId
 * @property {number} status
*/

const ordersCollection = DB.collection('orders');

export const OrdersModel = {
    /**
     * @param {OrderInfo} orderBody
     * @param {ObjectId} userId
     * @param {string} timeStamp
     * 
     * @returns {Promise<ObjectId>}
    */
    create: async function(orderBody, userId, timeStamp) {
        const newOrder = await ordersCollection.insertOne({
            orderInfo: [orderBody],
            userId: userId,
            datetime: timeStamp,
            status: 0
        });

        return newOrder.insertedId;
    },

    get: async function () {},

    /**
     * @param {ObjectId} orderId 
     * 
     * @returns {Promise<Orders>}
    */
    getOne: async function(orderId) {
        const orderInfo = await ordersCollection.findOne({ _id: orderId });
        return orderInfo;
    },

    /**
     * 
     * @param {ObjectId} orderId 
     * @param {OrderInfo} orderInfo 
     * @param {string} orderInfo 
     * 
     * @returns {Promise<boolean>}
    */
    update: async function(orderId, orderInfo, timestamp) {
        const _orderId = await ordersCollection.updateOne(
            { _id: orderId },
            {
                $push: { orderInfo: orderInfo },
                $set: { datetime: timestamp }
            }
        )
        return true;
    },

    delete: async function() {}
}