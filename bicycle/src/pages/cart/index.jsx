import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useRequest } from '../../helpers/hooks/useRequest';

import { CartCard } from '../../components/Cards/cartCard';

import './style.scss';
import { API_URL } from '../../requests/request';
import { Decrypt, Encrypt } from '../../helpers/AES';

export const CartPage = () => {
    const [orderPrice, setOrderPrice] = useState(0);
    const [orderDiscount, setOrderDiscount] = useState(0);
    const [orderFinal, setOrderFinal] = useState(0);
    const [orderItems, setOrderItems] = useState([]);

    const { orderData, orderIsLoading, orderIsErr } = useRequest(`/orders/getOrder/${JSON.parse(localStorage.getItem('OrId'))}`, {
        data: 'orderData',
        loading: 'orderIsLoading',
        error: 'orderIsErr'
    });

    const deleteItem = (id) => {
        API_URL.post('/orders/deleteItem', {
            orderId: Encrypt(JSON.parse(localStorage.getItem('OrId'))),
            itemId: Encrypt(id)
        }).then(({data}) => {
            const decryptedData = Decrypt(data);
            if (decryptedData.response ==='item deleted') {
                setOrderItems({
                    orderId: decryptedData.orderId,
                    orderInfo: orderItems.orderInfo.filter((val) => {if (val.itemId != id) { return val; }})
                })
            }
        }).catch((err) => { console.log('something wrong >_<'); })
    }

    const clearCart = () => { console.log('clear cart'); }
    const sendOrder = () => { console.log(orderItems.orderId, 1); }

    useEffect(() => {
        let newOrderPrice = 0;
        let newOrderDiscount = 0;

        orderItems?.orderInfo?.map((data) => {
            newOrderPrice += data.price * data.amount;
            newOrderDiscount += (data.price * data.discount / 100) * data.amount;
        });

        setOrderPrice(newOrderPrice);
        setOrderDiscount(newOrderDiscount);
        setOrderFinal(newOrderPrice - newOrderDiscount);
    }, [orderItems]);
    useEffect(() => { setOrderItems(orderData) }, [orderData]);

    return (
        <div className='cartPage'>
            <p className='cartPage__links'>
                <Link to='/' className='cartPage__links-link'>Главная</Link>
                <span>/</span>
                <Link to='/cart' className='cartPage__links-link'>Корзина</Link>
            </p>
            <div className='cartPage__body'>
                <h1 className='cartPage__body-header'>Корзина</h1>
                <div className='cartPage__body__wrapper'>
                    <div className='cartPage__body__wrapper__items'>
                        <div className='cartPage__body__wrapper__items-header'>
                            <Link to='/catalog/bicycles?page=1' className='cartPage__body__wrapper__items-header-link'>Вернуться к покупкам</Link>
                            <button onClick={clearCart} className='cartPage__body__wrapper__items-header-button'>Очистить корзину</button>
                        </div>
                        <div className='cartPage__body__wrapper__items__itemsList'>
                            {orderItems?.orderInfo?.map((data, key) => {
                                return (
                                    <CartCard
                                        key={key}
                                        id={data.itemId}
                                        image={data.image}
                                        title={data.title}
                                        amount={data.amount}
                                        price={data.price}
                                        discount={data.discount}
                                        maxAmount={data.maxAmount}
                                        deleteItemCallback={() => { deleteItem(data.itemId); }}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className='cartPage__body__wrapper__order'>
                        <p className='cartPage__body__wrapper__order-text'>Номер заказа<br/><span>{orderData.orderId}</span></p>
                        <p className='cartPage__body__wrapper__order-text'>Сумма заказа (без скидки)<br/><span>{orderPrice.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</span></p>
                        <p className='cartPage__body__wrapper__order-text'>Скидка<br/><span>{orderDiscount.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</span></p>
                        <p className='cartPage__body__wrapper__order-finalPrice'>Итого<br/><span>{orderFinal.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</span></p>
                        <button className='cartPage__body__wrapper__order-button' onClick={sendOrder}>Оформить заказ</button>
                    </div>
                </div>
            </div>
        </div>
    );
}