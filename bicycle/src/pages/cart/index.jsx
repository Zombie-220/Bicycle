import { Link } from 'react-router-dom';

import { CartCard } from '../../components/CartCard';

import './style.scss';
import { useEffect, useState } from 'react';

export const CartPage = () => {
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('cartProducts')));

    useEffect(() => {
        setProducts(JSON.parse(localStorage.getItem('cartProducts')));
    }, [])

    return (
        <div className="cartPage">
            <div className='order__heeaderBackground'></div>
            <div className="cartPage__body">
                <p><Link>Главная</Link><span>|</span><Link>Корзина</Link></p>
                <p>Корзина</p>
                <div className='cartPage__body__container'>
                    {products.map((data) => {
                        return(
                            <CartCard
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
                    <p>Номер заказа</p>
                    <p>123</p>
                </div>
                <div className='cartPage__check-number'>
                    <p>Сумма заказа</p>
                    <p>100 ₽</p>
                </div>
                <p>Итого: 123</p>
                <button>Оформить заказ</button>
            </div>
        </div>
    );
}