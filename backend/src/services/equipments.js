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
                brand: data.brand,
                model: data.model,
                productImage: data.productImage,
                price: data.price,
                amount: data.amount,
                discount: data.discount,
                type: data.model
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
            brand: equipment.brand,
            model: equipment.model,
            productImage: equipment.productImage,
            price: equipment.price,
            amount: equipment.amount,
            discount: equipment.discount,
            color: equipment.color,
            size: equipment.size
        }));
    },

    catalogMenu: async function() {
        const _brands = await EquipmentsModel.orderBy('brand', 'amount');
        const _model = await EquipmentsModel.orderBy('model', 'amount');

        return(Encrypt({
            brands: _brands,
            categories: _model
        }));
    },

    change: async function(reqBody) {
        const _body = reqBody;
        let _titleArr = reqBody.title.split(' ');
        const _brand = _titleArr[0];
        _titleArr.shift();
        const _model = _titleArr.join(' ');

        const updatedEquipment = await EquipmentsModel.update({
            brand: _brand,
            model: _model,
            price: _body.value,
            amount: _body.amount,
            discount: _body.discount
        }, _body.id);

        return ({ resp: 'ok' });
    }
}