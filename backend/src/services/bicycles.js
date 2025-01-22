import { BicyclesModel } from "../models/bicycles.js";

import { Encrypt } from "../helpers/encryption.js";
import { ObjectId } from "mongodb";

export const BicyclesService = {
    /**
     * @param {string} amount
     * @returns {Promise<Bicycle[]>}
    */
    getByAmount: async function(amount) {
        const _amount = parseInt(amount);
        const bicycles = await BicyclesModel.getByAmomunt(_amount);

        const encryptedData = bicycles.map((data) => {
            return (Encrypt({
                _id: data._id,
                brand: data.brand,
                model: data.model,
                productImage: data.productImage,
                countryImage: data.countryImage,
                price: data.price,
                amount: data.amount,
                discount: data.discount
            }))
        });
        return encryptedData;
    },

    /**
     * @param {string} amount
     * @returns {Promise<Bicycle[]>}
    */
    getLatest: async function(amount) {
        const _amount = parseInt(amount);
        const latestBicycles = await BicyclesModel.getLatest(_amount);

        const encryptedData = latestBicycles.map((data) => {
            return (Encrypt({
                _id: data._id,
                brand: data.brand,
                model: data.model,
                productImage: data.productImage,
                countryImage: data.countryImage,
                price: data.price,
                amount: data.amount,
                discount: data.discount
            }))
        });
        return encryptedData;
    },

    /**
     * @param {string} field 
     * @param {string} summ 
     * @returns {Promise<Bicycle[]>}
    */
    orderBy: async function(field, summ) {
        const result = await BicyclesModel.orderBy(field, summ);

        const encryptedData = result.map((data) => {
            return (Encrypt({
                field: data.field,
                summ: data.summ
            }))
        });

        return encryptedData;
    },

    /**
     * @param {string} id 
     * @returns {Promise<Bicycle>}
    */
    byId: async function(id) {
        const _id = new ObjectId(id);
        const bicycle = await BicyclesModel.byId(_id)

        return (Encrypt({
            brand: bicycle.brand,
            model: bicycle.model,
            productImage: bicycle.productImage,
            size: bicycle.size,
            color: bicycle.color,
            price: bicycle.price,
            amount: bicycle.amount,
            // technicalPassport: bicycle.technicalPassport
        }));
    }
}