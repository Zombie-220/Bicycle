import { useContext, useEffect, useState } from 'react';

import { baseURL } from '../../requests/request';
import { AddedProductsToCart } from '../../App';

import './style.scss';
import closeIcon from '../../assets/icons/close.svg';

export const CartCard = ({ id, amountCard }) => {
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(amountCard);
    const { addedProductToCart, setAddedProductToCart } = useContext(AddedProductsToCart);

    function minusAmount() {if (amount > 1) { setAmount(amount - 1); }}
    function plusAmount() {if (amount < product.amount) { setAmount(amount + 1); }}

    function deleteProduct() {
        let x = [];

        addedProductToCart.map((data) => {
            if (data.productId != id) {
                x.push(data);
            }
        });

        setAddedProductToCart(x);
    }

    useEffect(() => {
        baseURL(`/products/byId/${id}`).then((data) => {
            setProduct(data.data);
        }).catch((err) => { console.log(err); })
    }, [addedProductToCart, setAddedProductToCart]);

    return(
        <div className="cartCard">
            <img src={product.productImage} alt="productImage" className="cartCard-img" />
            <p className="cartCard-name">{product.name}</p>
            <div className="cartCard__counterContainer">
                <button className="cartCard__counterContainer-minus" onClick={minusAmount}>-</button>
                <p className="cartCard__counterContainer-amount">{amount}</p>
                <button className="cartCard__counterContainer-plus" onClick={plusAmount}>+</button>
            </div>
            <p className="cartCard-price">{(product.price*amount).toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
            <button className="cartCard-deleteButton" onClick={deleteProduct}><img src={closeIcon} alt="closeIcon" className="cartCard-deleteButton-img" /></button>
        </div>
    );
}