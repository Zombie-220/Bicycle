import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { baseURL } from '../../requests/request';

import { AdminCard } from '../../components/adminCard';
import './style.scss';

export const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        baseURL('/products/all').then((data) => { setProducts(data.data); })
    }, []);

    const removeProduct = (id) => {
        baseURL.post(`/products/delete`, { productId: id })
        .then(() => {
            baseURL('/products/all').then((data) => {
                setProducts(data.data);
            })
        }).catch((err) => { console.log(err) })        
    }

    return (
        <div className="adminPage">
            <div className='order__heeaderBackground'></div>
            <div className='adminPage__body'>
                <button onClick={() => {navigate('/addPage')}} className='adminPage__body-button'>+ Добавить</button>
                <div className='adminPage__body-wrapper'>
                    {products.map((data, index) => {
                        return(
                            <AdminCard
                                key={index}
                                id={data._id}
                                name={data.name}
                                image={data.productImage}
                                cost={data.price}
                                amount={data.amount}
                                onRemove={removeProduct}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}