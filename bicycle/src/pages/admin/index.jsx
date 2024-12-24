import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { API_URL } from '../../requests/request';

import { AdminBicycleCard } from '../../components/AdminBicycleCard';
import { AdminOrderCard } from '../../components/AdminOrderCard';
import './style.scss';

export const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { section } = useParams();

    useEffect(() => {
        switch (section) {
            case 'bicycle':
                API_URL('/products/all').then(({ data }) => { setProducts(data); });
                break;
            case 'orders':
                API_URL('/orders/all').then(({ data }) => { setProducts(data.items); });
                break;
        }
    }, [section]);

    const removeProduct = (id) => {
        API_URL.post(`/products/delete`, { productId: id })
        .then(() => {
            API_URL('/products/all').then((data) => {
                setProducts(data.data);
            })
        }).catch((err) => { console.log(err) })        
    }

    const navigateToBicycle = () => { navigate('/admin/bicycle'); }
    const navigateToOrders = () => { navigate('/admin/orders'); }

    return (
        <div className="adminPage">
            <div className='order__heeaderBackground'></div>
            <div className='adminPage__body'>
                <div className='adminPage__body__buttonWrapper'>
                    <button onClick={() => {navigate('/addPage')}} className='adminPage__body__buttonWrapper-button'>+ Добавить Велосипед</button>
                    <button className='adminPage__body__buttonWrapper-link' onClick={navigateToBicycle}>Велосипеды</button>
                    <button className='adminPage__body__buttonWrapper-link' onClick={navigateToOrders}>Заказы</button>
                </div>
                <div className='adminPage__body-wrapper'>
                    {products != [] ? products.map((data, index) => {
                        switch (section) {
                            case 'bicycle':
                                return(
                                    <AdminBicycleCard
                                        key={index}
                                        id={data._id}
                                        name={data.name}
                                        image={data.productImage}
                                        cost={data.price}
                                        amount={data.amount}
                                        onRemove={removeProduct}
                                    />
                                )
                            case 'orders':
                                return(
                                    <AdminOrderCard
                                        key={index}
                                        id={data._id}
                                        totalCost={data.totalCost}
                                        orderInfo={data.orderInfo}
                                        time={data.orderTime}
                                        user={data.user}
                                        status={data.status}
                                    />
                                )
                        }
                    }) : <p>No Data</p>}
                </div>
            </div>
        </div>
    );
}