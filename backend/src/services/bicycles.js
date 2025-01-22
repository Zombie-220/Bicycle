import { BicyclesModel } from "../models/bicycles.js";

import { Encrypt } from "../helpers/encryption.js";

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
    }
}