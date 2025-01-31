import { ObjectId } from "mongodb";
import { DB } from "../config/database/database.js";

/**
 * @typedef {Object} Bicycle Велосипед
 * @property {ObjectId} _id - Идентификатор товара
 * @property {string} brand - Марка велосипеда
 * @property {string} model - Модель велосипеда
 * @property {string} productImage - Картинка велосипеда
 * @property {string} countryImage - Страна-производитель велосипеда
 * @property {string} type - Тип велосипеда (горный, шоссейный и т.п.)
 * @property {string[]} size - Размеры рам
 * @property {string[]} color - Цвета рам
 * @property {number} price - Цена за единицу продукта
 * @property {number} discount - Скидка на товар
 * @property {number} amount - Количество на складе
 * @property {string} productionDate - Дата выпуска велосипеда (в формате "dd-mm-yyyy")
 * @property {TechnicalPassport} technicalPassport - Характеристики деталей велосипеда
*/

/**
 * @typedef {Object} TechnicalPassport Технический паспорт велосипеда
 * @property {string[]} frame - Возможные рамы для установки
 * @property {string[]} fork - Возможные передние вилки для установки
 * @property {string} brakes - Тормоза
 * @property {string} tires - Покрышки
 * @property {number} guarantee - Срок гарантии при приобретении (в годах)
*/

const bicyclesCollection = DB.collection('bicycles');

export const BicyclesModel = {
    /**
     * @param {number} amount 
     * @returns {Promise<Bicycle[]>}
    */
    getByAmomunt: async function(amount) {
        const bicycles = await bicyclesCollection.find().limit(amount).toArray();
        return bicycles;
    },

    /**
     * @param {number} amount 
     * @returns {Promise<Bicycle[]>}
    */
    getLatest: async function(amount) {
        const latestBicycles = await bicyclesCollection.find().sort({ productionDate: -1 }).toArray();

        if (amount) { return latestBicycles.slice(0, amount); }
        else { return latestBicycles; }
    },

    /**
     * @param {string} field 
     * @param {string} summ 
     * @returns {Promise<{field: string, summ: number}[]>}
    */
    orderBy: async function(field, summ) {
        const pipeline = [{$group: { _id: `$${field}`, totalQuantity: { $sum: `$${summ}` }}},
            {$project : { _id: 0, field: '$_id', summ: '$totalQuantity' }}];

        const result = await bicyclesCollection.aggregate(pipeline).toArray();
        return result;
    },

    /**
     * @param {number} id 
     * @returns {Promise<Bicycle>}
    */
    getById: async function(id) {
        const bicycle = await bicyclesCollection.findOne({ _id: id });
        return bicycle;
    },

    /**
     * @param {object} filter 
     * @returns {Promise<Bicycle[]>}
    */
    filter: async function(filter) {
        const filteredBicycles = await bicyclesCollection.find(filter).toArray();
        return filteredBicycles;
    }
}