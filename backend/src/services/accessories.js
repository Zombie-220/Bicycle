import { ObjectId } from "mongodb";

import { Encrypt } from "../helpers/encryption.js";
import { AccessoriesModel } from "../models/accessories.js";

export const AccessoriesService = {
    byAmount: async function(amount) {
        const _amount = parseInt(amount)
        const accessories = await AccessoriesModel.byAmount(_amount);

        const encryptedData = accessories.map((data) => {
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

    getById: async function(id) {
        const _id = new ObjectId(id);
        const accessorie = await AccessoriesModel.getById(_id);

        return (Encrypt({
            brand: accessorie.brand,
            model: accessorie.model,
            productImage: accessorie.productImage,
            price: accessorie.price,
            amount: accessorie.amount,
            discount: accessorie.discount,
            color: accessorie.color,
            size: accessorie.size
        }));
    },

    catalogMenu: async function() {
        const _brands = await AccessoriesModel.orderBy('brand', 'amount');
        const _model = await AccessoriesModel.orderBy('model', 'amount');

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

        const updatedAccessorie = await AccessoriesModel.update({
            brand: _brand,
            model: _model,
            price: _body.value,
            amount: _body.amount,
            discount: _body.discount
        }, _body.id);

        return ({ resp: 'ok' });
    }
};