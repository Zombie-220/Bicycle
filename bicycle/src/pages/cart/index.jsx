import { Link } from 'react-router-dom';

import { CartCard } from '../../components/CartCard';
import { baseURL } from '../../requests/request';

import './style.scss';
import { useContext, useEffect, useState } from 'react';
import { AddedProductsToCart } from '../../App';

export const CartPage = () => {
    const { addedProductToCart, setAddedProductToCart } = useContext(AddedProductsToCart);
    const [products, setProducts] = useState([]);
    const [finalCost, setFinalCost] = useState(0);

    useEffect(() => {
        setFinalCost(0);
        setProducts(addedProductToCart);
    }, [addedProductToCart, setAddedProductToCart]);

    useEffect(() => {
        products.map((productData) => {
            baseURL(`products/byId/${productData.productId}`).then((data) => {
                setFinalCost(finalCost + (data.data.price * productData.amount));
            }).catch((err) => { console.log(err); })
        })
    }, [products, setProducts]);

    function sendOrder() {
        baseURL.post('orders/add', {
            cost: finalCost,
            products: addedProductToCart.map((data) => { return (data.productId) })
        }).then((data) => {}).catch((err) => console.log(err))
    }

    return (
        <div className="cartPage">
            <div className='order__heeaderBackground'></div>
            <div className="cartPage__body">
             <p className='order__wrapper__links'>
                    <Link to='/' className='order__wrapper__links-link'>Главная</Link>
                    <p className='order__wrapper__links-border'>|</p>
                    <Link to='/cart' className='order__wrapper__links-link activeLink'>Корзина</Link>
                </p>
                <p className='order__wrapper__body__rightSide-productName customCartPageHeader'>Корзина</p>
                <div className='cartPage__body__container'>
                    {products.map((data, index) => {
                        if (addedProductToCart.includes(data)) {
                            return(
                                <CartCard
                                    key={index}
                                    id={data.productId}
                                    amountCard={data.amount}
                                    size={data.size}
                                />
                            );
                        }
                    })}
                </div>
            </div>
            <div className='cartPage__check'>
                <p className='cartPage__check-result'>Сумма заказа: {finalCost.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
                <button className='cartPage__check-button' disabled={products.length > 0? false : true} onClick={sendOrder}>Оформить заказ</button>
            </div>
        </div>
    );
}