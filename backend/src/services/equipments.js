import { ObjectId } from 'mongodb';

import { Encrypt } from '../helpers/encryption.js';
import { EquipmentsModel } from '../models/equipments.js';

export const EquipmentsService = {
    /**
     * @param {string} amount 
     * @returns {Promise<Equipment[]>}
    */
    byAmount: async function(amount) {
        const _amount = parseInt(amount)
        const equipments = await EquipmentsModel.byAmount(_amount);

        const encryptedData = equipments.map((data) => {
            return (Encrypt({
                _id: data._id,
                name: data.name,
                productImage: data.productImage,
                price: data.price,
                amount: data.amount,
                discount: data.discount
            }))
        });
        return encryptedData;
    },

    /**
     * @param {string} id
     * @returns {Promise<Equipment>}
    */
    getById: async function(id) {
        const _id = new ObjectId(id);
        const equipment = await EquipmentsModel.getById(_id);

        return (Encrypt({
            name: equipment.name,
            productImage: equipment.productImage,
            price: equipment.price,
            amount: equipment.amount,
            discount: equipment.discount,
            color: equipment.color,
            size: equipment.size
        }));
    }
}