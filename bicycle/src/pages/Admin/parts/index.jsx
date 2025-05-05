import { useEffect, useState } from "react";
import { API_URL } from "../../../requests/request";

import { Decrypt } from '../../../helpers/AES';

import { ItemCard } from "../../../components/Cards/itemCard";

export const PartsInfoPage = () => {
    const [bicyclesInfo, setBicyclesInfo] = useState([]);

    useEffect(() => {
        API_URL.get('/parts/amount').then(({ data }) => {
            const decryptedData = Decrypt(data);
            setBicyclesInfo(decryptedData);
        }).catch((err) => { console.log(err); });
    }, []);

    return (
        <div className="partsInfoPage">
            {bicyclesInfo.map((data, index) => {
                return (
                    <ItemCard
                        id={data._id}
                        title={`${data.brand} ${data.model}`}
                        image={data.productImage}
                        amount={data.amount}
                        price={data.price}
                        discount={data.discount}
                        category={'parts'}
                    />
                )
            })}
        </div>
    );
}