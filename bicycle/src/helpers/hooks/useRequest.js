import { useEffect, useState } from "react";

import { API_URL } from "../../requests/request";
import { Decrypt } from "../AES";

/**
 * @typedef {object} Bicycle
 * @property {string} _id
 * @property {string} brand
 * @property {string} model
 * @property {string} productImage
 * @property {string} countryImage
 * @property {number} price
 * @property {number} amount
 * @property {number} discount
*/

/**
 * @typedef {object} Equipment
 * @property {string} _id
 * @property {string} name
 * @property {number} price
 * @property {string[]} size
 * @property {string[]} color
 * @property {number} amount
 * @property {number} discount
*/

/**
 * @param {string} url url на который идет запрос
 * @param {{data: string, loading: string, error: string}} options имена полей, которые будет возвращать hook
 * @returns {{data: Bicycle | Equipment | Bicycle[] | Equipment[], loading: boolean, error: boolean}}
*/
export function useRequest(url, { data, loading, error }) {
    const [hookData, setHookData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        API_URL(url).then(({ data }) => {
            setHookData(Decrypt(data));
            setIsLoading(false);
            setIsError(false);
        }).catch(() => { setIsError(true); })
    }, [url, data, loading, error])

    return {
        [data]: hookData,
        [loading]: isLoading,
        [error]: isError
    }
}