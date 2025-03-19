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
                discount: data.discount,
                type: data.type,
                colors: data.color
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
    getById: async function(id) {
        const _id = new ObjectId(id);
        const bicycle = await BicyclesModel.getById(_id);

        return (Encrypt({
            brand: bicycle.brand,
            model: bicycle.model,
            productImage: bicycle.productImage,
            size: bicycle.size,
            color: bicycle.color,
            price: bicycle.price,
            discount: bicycle.discount,
            amount: bicycle.amount,
            technicalPassport: bicycle.technicalPassport
        }));
    },

    /**
     * @param {object} query
     * @returns {Promise<Bicycle[]>}
    */
    filter: async function(query) {
        if (query.type && query.startDate && query.endDate) {
            const _type = query.type;
            const [_startDay, _startMonth, _startYear] = query.startDate.split('-');
            const [_endDay, _endMonth, _endYear] = query.endDate.split('-');
            const _amount = query.amount ? Number(query.amount) : 0;

            const filter = {
                type: _type,
                productionDate: {
                    $gte: new Date(`${_startYear}-${_startMonth}-${_startDay}`),
                    $lte: new Date(`${_endYear}-${_endMonth}-${_endDay}`)
                }
            };
            const filteredBicycles = await BicyclesModel.filter(filter);

            const filterResult = filteredBicycles.map((data) => {
                return (Encrypt({
                    _id: data._id,
                    brand: data.brand,
                    model: data.model,
                    productImage: data.productImage,
                    price: data.price,
                    discount: data.discount,
                    amount: data.amount,
                }));
            });
            
            return (filterResult.slice(0, _amount));
        } else if (query.type) {
            const _type = query.type;

            const filter = {
                type: _type
            };
            const filteredBicycles = await BicyclesModel.filter(filter);

            const filterResult = filteredBicycles.map((data) => {
                return (Encrypt({
                    brand: data.brand,
                    model: data.model,
                    productImage: data.productImage,
                    size: data.size,
                    color: data.color,
                    price: data.price,
                    discount: data.discount,
                    amount: data.amount,
                    technicalPassport: data.technicalPassport
                }));
            });

            return (filterResult);
        } else { return ({}); }
    },

    catalogMenu: async function() {
        const _categories = await BicyclesModel.orderBy('type', 'amount');
        const _brands = await BicyclesModel.orderBy('brand', 'amount');
        const _colors = await BicyclesModel.getField('color');

        let filteredColors = [];
        _colors.map((data) => {
            data.map((innerData) => {
                if (!filteredColors.includes(innerData)) { filteredColors.push(innerData); }
            })
        });

        return(Encrypt({
            categories: _categories,
            brands: _brands,
            colors: filteredColors
        }));
    }
}