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
    }
}