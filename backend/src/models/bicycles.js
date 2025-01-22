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

/**
 * @param {string} amount 
 * @returns {Promise<Bicycle[]>}
*/
export const GetBicyclesByAmount_M = async (amount) => {
    const result = await bicyclesCollection.find().limit(parseInt(amount)).toArray();
    return result;
}

/**
 * @returns {Promise<Bicycle[]>}
*/
export const GetAllBicycles = async () => {
    const result = await bicyclesCollection.find({}).toArray();
    return result;
}

/**
 * @param {string} field 
 * @param {string} summ 
 * @returns {Promise<Bicycle[]>}
*/
export const GetBicyclesOrderBy_M = async (field, summ) => {
    const pipeline = [{$group: { _id: `$${field}`, totalQuantity: { $sum: `$${summ}` }}},
        {$project : { _id: 0, field: '$_id', summ: '$totalQuantity' }}];

    const result = await bicyclesCollection.aggregate(pipeline).toArray();
    return result;
}

/**
 * @param {string} id 
 * @returns {Promise<Bicycle>}
*/
export const GetBicycleById_M = async (id) => {
    const result = await bicyclesCollection.findOne({ _id: new ObjectId(id) });
    return result;
}

/**
 * @param {number} amount
 * @returns {Promise<Bicycle[]>}
*/
export const GetLatestBicycles_M = async (amount) => {
    const allBicycles = await bicyclesCollection.find().toArray();
    const sortedBicyclesArray = allBicycles.map((data) => {
        const [day, month, year] = data.productionDate.split('-');
        return { ...data, date: new Date(`${year}-${month}-${day}`) };
    }).sort((a, b) => b.date - a.date );

    return sortedBicyclesArray.slice(0, amount);
}


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
        const latestBicycles = await bicyclesCollection.find().toArray();

        const sortedLatestBicycles = latestBicycles.map((data) => {
            const [day, month, year] = data.productionDate.split('-');
            return {...data, date: new Date(`${year}-${month}-${day}`)};
        }).sort((a,b) => b.date - a.date);

        return sortedLatestBicycles.slice(0, amount);
    }
}