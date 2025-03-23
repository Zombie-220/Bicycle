import { useState } from 'react';

import './style.scss';

export const CartCard = ({ id, image, title, amount, price, discount, maxAmount }) => {
    const [currentAmount, setCurrentAmount] = useState(amount);
    
    const plusAmount = () => {
        if (currentAmount < maxAmount) { setCurrentAmount(currentAmount+1); }
    }
    const minusAmount = () => {
        if (currentAmount > 1) { setCurrentAmount(currentAmount-1); }
    }
    const deleteItem = (itemId) => {
        console.log(`delete ${itemId} item`);
    }

    return (
        <div className='cartCard'>
            <img src={image} alt={`${title} image`} className='cartCard-img'/>
            <p className='cartCard-title'>{title}</p>
            <div className='cartCard__counter'>
                <button className='cartCard__counter-button' onClick={minusAmount}>-</button>
                <p className='cartCard__counter-text'>{currentAmount}</p>
                <button className='cartCard__counter-button' onClick={plusAmount}>+</button>
            </div>
            <div className='cartCard__price'>
                <p className='cartCard__price-price'>{(price - price * discount / 100).toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
                {discount !== 0 && (
                    <p className='cartCard__price-discount'>{price.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
                )}
            </div>
            <button className='cartCard__deleteBtn' onClick={() => { deleteItem(id) }}>
                <div className='cartCard__deleteBtn-elem'></div>
                <div className='cartCard__deleteBtn-elem'></div>
            </button>
        </div>
    );
}