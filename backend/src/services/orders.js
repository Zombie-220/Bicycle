import { ObjectId } from "mongodb";

import { Decrypt, Encrypt } from "../helpers/encryption.js";

import { BicyclesModel } from '../models/bicycles.js';
import { OrdersModel } from '../models/orders.js';
import { UsersModel } from '../models/users.js';

export const OrdersService = {
    /**
     * @param {string} orderId
     * @param {OrderInfo} orderBody
     * @param {string} userId
     * @param {string} timeStamp
     * 
     * @returns {Promise<ObjectId>}
    */
    create: async function(orderId=null, orderBody, userId, timestamp) {
        const _userId = new ObjectId(Decrypt(userId));
        const _orderBody = Decrypt(orderBody);
        const _timestamp = Decrypt(timestamp);
        const _orderId = Decrypt(orderId) === null ? null : new ObjectId(Decrypt(orderId));
        
        if (_orderId) {
            const changedOrderId = await OrdersModel.update(_orderId, _orderBody, _timestamp);
            return Encrypt({
                id: _orderId,
                response: 'order updated'
            });
        } else {
            const newOrderId = await OrdersModel.create(_orderBody, _userId, _timestamp);
            return Encrypt({
                id: newOrderId,
                response: 'order created'
            });
        }
    },

    /**
     * @param {string} orderId
     * 
     * @returns {Promise<{}>}
    */
    getOne: async function(orderId) {
        const _orderId = new ObjectId(orderId);
        const orderInfo = await OrdersModel.getOne(_orderId);

        const returnigVal = {
            orderId: orderInfo._id,
            orderInfo: await Promise.all(orderInfo.orderInfo.map(async (data) => {
                const bicycleInfo = await BicyclesModel.getById(new ObjectId(data.id));
                return {
                    itemId: data.id,
                    image: bicycleInfo.productImage,
                    title: `${bicycleInfo.brand} ${bicycleInfo.model}`,
                    price: bicycleInfo.price,
                    discount: bicycleInfo.discount,
                    amount: data.amount,
                    maxAmount: bicycleInfo.amount
                };
            }))
        };

        return (Encrypt(returnigVal));
    },

    /**
     * @param {string} orderId
     * @param {string} itemId
    */
    deleteItem: async function(orderId, itemId) {
        const _orderId = new ObjectId(Decrypt(orderId));
        const _itemId = new ObjectId(Decrypt(itemId));

        const deleteItem = await OrdersModel.deleteItem(_orderId, _itemId);
        return Encrypt({ response: 'item deleted' });
    },

    /**
     * @param {number} orderId 
     * @param {string} status 
    */
    updateStatus: async function(orderId, status) {
        const _orderId = new ObjectId(Decrypt(orderId));
        const _status = parseInt(Decrypt(status));

        const updatedOrder = await OrdersModel.updateStatus(_orderId, _status);
        return Encrypt({ response: 'status updated' });
    },

    getAll: async function() {
        const allOrdersInfo = await OrdersModel.getAll();

        const result = await Promise.all(allOrdersInfo.map(async (data) => {
            return({
                id: data._id,
                username: (await UsersModel.getInfoById(new ObjectId(data.userId))).name,
                datetime: data.datetime,
                status: data.status,
                orderInfo: await Promise.all(data.orderInfo.map(async (innerData) => {
                    const bicycleInfo = await BicyclesModel.getById(new ObjectId(innerData.id));
                    return ({
                        name: `${bicycleInfo.brand} ${bicycleInfo.model}`,
                        price: bicycleInfo.price,
                        amount: parseInt(innerData.amount),
                        image: bicycleInfo.productImage
                    });
                }))
            });
        }));

        return result;
    }
}