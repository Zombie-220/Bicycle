import { Link } from 'react-router-dom';

import { CartCard } from '../../components/CartCard';

import './style.scss';
import { useContext, useEffect, useState } from 'react';
import { AddedProductsToCart } from '../../App';

export const CartPage = () => {
    const { addedProductToCart, setAddedProductToCart } = useContext(AddedProductsToCart);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(addedProductToCart);
    }, [addedProductToCart, setAddedProductToCart]);

    return (
        <div className="cartPage">
            <div className='order__heeaderBackground'></div>
            <div className="cartPage__body">
                <p><Link>Главная</Link><span>|</span><Link>Корзина</Link></p>
                <p>Корзина</p>
                <div className='cartPage__body__container'>
                    {products.map((data, index) => {
                        return(
                            <CartCard
                                key={index}
                                id={data.productId}
                                amountCard={data.amount}
                                size={data.size}
                            />
                        );
                    })}
                </div>
            </div>
            <div className='cartPage__check'>
                <div className='cartPage__check-number'>
                    <p>Номер заказа: {123}</p>
                </div>
                <div className='cartPage__check-number'>
                    <p>Сумма заказа: {100} ₽</p>
                </div>
                <p>Итого: {123} ₽</p>
                <button>Оформить заказ</button>
            </div>
        </div>
    );
}