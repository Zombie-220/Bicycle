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

        const encryptedData = Encrypt(equipments);
        return encryptedData;
    }
}