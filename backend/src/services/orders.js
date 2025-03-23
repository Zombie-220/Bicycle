import { ObjectId } from "mongodb";

import { OrdersModel } from '../models/orders.js';
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
    }
}