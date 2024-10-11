import { useCallback, useEffect, useState } from "react";
import { baseURL } from "../requests/request";

export const GetHook = ({ url, isEmpty = false }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [newItems, setNewItems] = useState([]);
    const [error, setError] = useState({ status: false, message: "" });

    const baseQuery = useCallback(
        (filter = null) => {
        setIsLoading(true);
        baseURL.get(url).then(({ data }) => {
                setNewItems(data)
            }).catch((baseError) => {console.log(baseError)})
            .finally(() => setIsLoading(false));
        }, [url]);

    useEffect(() => {
        if (!isEmpty) { baseQuery(); }
    }, [baseQuery, isEmpty]);

    const useQuery = useCallback(
        (filter) => {
            baseQuery(filter);
        }, [baseQuery]);
    console.log(newItems)
    return { newItems, setNewItems, isLoading, error, useQuery };
};