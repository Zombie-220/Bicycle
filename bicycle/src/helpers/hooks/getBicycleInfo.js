import { useEffect, useState } from "react";

import { API_URL } from "../../requests/request";
import { Decrypt } from "../AES";

/**
 * @typedef {object} Bicycle
 * @property {string} _id
 * @property {sting} brand
 * @property {string} model
 * @property {string} productImage
 * @property {string} countryImage
 * @property {number} price
 * @property {number} amount
 * @property {number} discount
*/

/**
 * @param {string} url url на который идет запрос
 * @param {{data: string, loading: string, error: string}} options имена полей, которые будет возвращать hook
 * @returns {{data: Bicycle, loading: boolean, error: boolean}}
*/

export function useBicycleData(url, { data, loading, error }) {
    const [hookData, setHookData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        API_URL(url).then(({ data }) => {
            var decryptedData = [];
            data.map((dataMap) => {
                return (decryptedData.push({
                    _id: Decrypt(dataMap._id),
                    brand: Decrypt(dataMap.brand),
                    model: Decrypt(dataMap.model),
                    productImage: Decrypt(dataMap.productImage),
                    countryImage: Decrypt(dataMap.countryImage),
                    price: parseInt(Decrypt(dataMap.price)),
                    amount: parseInt(Decrypt(dataMap.amount)),
                    discount: parseInt(Decrypt(dataMap.discount))
                }));
            });
    
            setHookData(decryptedData);
            setIsLoading(false);
            setIsError(false);
        }).catch(() => { setIsError(true); })
    }, [data, loading, error])

    return {
        [data]: hookData,
        [loading]: isLoading,
        [error]: isError
    }
}