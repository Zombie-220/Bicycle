import { ObjectId } from "mongodb";

import { OrdersModel } from '../models/orders.js';
import { BicyclesModel } from '../models/bicycles.js';
import { Decrypt, Encrypt } from "../helpers/encryption.js";

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
    }
}