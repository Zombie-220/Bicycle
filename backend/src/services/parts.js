import { ObjectId } from 'mongodb';

import { PartsModel } from '../models/parts.js';

import { Encrypt } from '../helpers/encryption.js';

export const PartsService = {
    byAmount: async function(amount) {
        const _amount = parseInt(amount);
        const parts = await PartsModel.byAmount(_amount);

        return(parts.map((data) => {
            return(Encrypt({
                _id: data._id,
                brand: data.brand,
                model: data.model,
                productImage: data.productImage,
                size: data.size,
                color: data.color,
                price: data.price,
                discount: data.discount,
                amount: data.amount
            }))
        }));
    },

    catalogMenu: async function () {
        const _brands = await PartsModel.orderBy('brand', 'amount');
        const _type = await PartsModel.orderBy('model', 'amount');

        return(Encrypt({
            brand: _brands,
            categories: _type
        }));
    },

    getById: async function(id) {
        const _id = new ObjectId(id);
        const part = await PartsModel.getById(_id);

        return(Encrypt({
            brand: part.brand,
            model: part.model,
            productImage: part.productImage,
            size: part.size,
            color: part.color,
            price: part.price,
            discount: part.discount,
            amount: part.amount
        }));
    },

    change: async function(reqBody) {
        const _body = reqBody;
        let _titleArr = reqBody.title.split(' ');
        const _brand = _titleArr[0];
        _titleArr.shift();
        const _model = _titleArr.join(' ');

        const updatedPart = await PartsModel.update({
            brand: _brand,
            model: _model,
            price: _body.value,
            amount: _body.amount,
            discount: _body.discount
        }, _body.id);

        return ({ resp: 'ok' });
    }
};