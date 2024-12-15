import { Link, useNavigate } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from 'react';

import { CartCard } from '../../components/CartCard';
import { baseURL } from '../../requests/request';
import { AddedProductsToCart, AuthContext } from '../../App';

import './style.scss';

export const CartPage = () => {
    const { addedProductToCart, setAddedProductToCart } = useContext(AddedProductsToCart);
    const { isAuth } = useContext(AuthContext);
    const [finalCost, setFinalCost] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let i = 0;
        addedProductToCart.map((data) => {
            i += data.price * data.amount;
        });
        setFinalCost(i);
    }, [addedProductToCart]);

    function sendOrder() {
        baseURL.post('/orders/add', {
            cost: finalCost,
            products: addedProductToCart.map((data) => { return ({id: data.productId, pricePerPiece: data.price, amount: data.amount, size: data.size? data.size:'M'}) }),
            userId: isAuth
        }).then(({ data }) => {
            if (data.response == 200) {
                // navigate('/');
                // setAddedProductToCart([]);
            }
        }).catch((err) => console.log(err))
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
                <p className='order__wrapper__body__rightSide-productName customCartPageHeader' style={{zIndex: 10}}>Корзина</p>
                <div className='cartPage__body__container'>
                    {addedProductToCart.map((data, index) => {
                        if (addedProductToCart.includes(data)) {
                            return(
                                <CartCard
                                    key={index}
                                    id={data.productId}
                                    amountCard={data.amount}
                                />
                            );
                        }
                    })}
                </div>
            </div>
            <div className='cartPage__check'>
                <p className='cartPage__check-result'>Сумма заказа: {finalCost.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
                <button className='cartPage__check-button' disabled={addedProductToCart.length > 0? false : true} onClick={sendOrder}>Оформить заказ</button>
            </div>
        </div>
    );
}