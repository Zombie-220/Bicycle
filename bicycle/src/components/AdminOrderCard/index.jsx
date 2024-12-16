import React, { useState } from 'react';

import { baseURL } from '../../requests/request';

import './style.scss';

export const AdminOrderCard = ({ id='', totalCost=0, orderInfo=[], time=0, user='', status=1 }) => {
    const [selectedOption, setSelectedOption] = useState(status);

    const ChangeOption = (status) => {
        setSelectedOption(status);
        baseURL.post(`/orders/change/${id}`, {status: status})
        .then((data) => {  }).catch((err) => { console.log(err) });
    }

    return(
        <div className='adminOrderCard'>
            <div className='adminOrderCard__orderInfo-left'>
                <p className='adminOrderCard__orderInfo-left-header'>ID заказа: {id}</p>
                <div className='adminOrderCard__orderInfo-left'>
                    <p className='adminOrderCard__orderInfo-left-id'>ID заказчика: {user}</p>
                    <p className='adminOrderCard__orderInfo-left-price'>Общая стоимость заказа: {totalCost.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
                    <p className='adminOrderCard__orderInfo-left-time'>Время заказа: {time}</p>
                </div>
            </div>
            <div className='adminOrderCard__orderInfo-center'>
                <p className='adminOrderCard__orderInfo-center-header'>Информация по заказу</p>
                {orderInfo.map((data, index) => {
                    return(
                        <div key={index} className='adminOrderCard__orderInfo-center-product'>
                            <p className='adminOrderCard__orderInfo-center-product-header'>ID товара: {data.id}</p>
                            <p className='adminOrderCard__orderInfo-center-product-text'>Цена за штуку: {data.pricePerPiece}</p>
                            <p className='adminOrderCard__orderInfo-center-product-text'>Количество: {data.amount} шт.</p>
                            <p className='adminOrderCard__orderInfo-center-product-text'>Размер рамы: {data.size}</p>
                        </div>
                    )
                })}
            </div>
            <div className='adminOrderCard__orderInfo-right'>
                <p className='adminOrderCard__orderInfo-right-header'>Статус заказа:</p>
                <div className="radio-inputs">
                <label className="radio">
                    <input type="radio" name={`radio-${id}`} checked={selectedOption === -1} onChange={() => {ChangeOption(-1)}}/>
                    <span className="name">Отказано</span>
                </label>
                <label className="radio">
                    <input type="radio" name={`radio-${id}`} checked={selectedOption === 0} onChange={() => {ChangeOption(0)}}/>
                    <span className="name">На рассмотрении</span>
                </label>
                <label className="radio">
                    <input type="radio" name={`radio-${id}`} checked={selectedOption === 1} onChange={() => {ChangeOption(1)}}/>
                    <span className="name">Принято</span>
                </label>
                </div>
            </div>
        </div>
    )
}