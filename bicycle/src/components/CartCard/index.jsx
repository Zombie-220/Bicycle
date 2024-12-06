import { useEffect, useState } from "react";

import { baseURL } from '../../requests/request';
import closeIcon from '../../assets/icons/close.svg';

import './style.scss';

export const CartCard = ({ id, amountCard }) => {
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(amountCard);

    function minusAmount() {if (amount > 1) { setAmount(amount - 1); }}
    function plusAmount() {if (amount < product.amount) { setAmount(amount + 1); }}

    function deleteProduct() {
        let allProducts = JSON.parse(localStorage.getItem('cartProducts'))
        let newProducts = [];

        allProducts.map((data) => {
            if (id != data.productId) { newProducts.push(data); }
        });
        
        localStorage.setItem('cartProducts', JSON.stringify(newProducts));
    }

    useEffect(() => {
        baseURL(`/products/byId/${id}`).then((data) => {
            setProduct(data.data);
        }).catch((err) => console.log(err))
    }, [])

    return(
        <div className="cartCard">
            <img src={product.productImage} alt="productImage" className="cartCard-img" />
            <p className="cartCard-name">{product.name}</p>
            <div className="cartCard__counterContainer">
                <button className="cartCard__counterContainer-minus" onClick={minusAmount}>-</button>
                <p className="cartCard__counterContainer-amount">{amount}</p>
                <button className="cartCard__counterContainer-plus" onClick={plusAmount}>+</button>
            </div>
            <p className="cartCard-price">{(product.price*amount).toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            <button className="cartCard-deleteButton" onClick={deleteProduct}><img src={closeIcon} alt="closeIcon" className="cartCard-deleteButton-img" /></button>
        </div>
    );
}