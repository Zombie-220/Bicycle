import React, { useEffect, useState } from 'react';

import { API_URL } from '../../requests/request';

import './style.scss';

export const AdminOrderCard = ({ id='', totalCost=0, orderInfo=[], time=0, user='', status=0 }) => {
    const [selectedOption, setSelectedOption] = useState(status);
    const [date, setDate] = useState(0);

    const ChangeOption = (status) => {
        setSelectedOption(status);
        API_URL.post(`/orders/change/${id}`, {status: status})
        .then((data) => {  }).catch((err) => { console.log(err) });
    }
    
    useEffect(() => {
        let temp_date = new Date(time);
        let year = temp_date.getFullYear();
        let month = temp_date.getMonth()+1;
        let day = temp_date.getDate();
        let hours = temp_date.getHours();
        let minutes = temp_date.getMinutes();
        let seconds = temp_date.getSeconds();

        setDate([year, month, day, hours, minutes, seconds]);
    }, [time])

    return(
        <div className='adminOrderCard'>
            <div className='adminOrderCard__orderInfo-left'>
                <p className='adminOrderCard__orderInfo-left-header'>ID заказа: {id}</p>
                <div className='adminOrderCard__orderInfo-left'>
                    <p className='adminOrderCard__orderInfo-left-id'>ID заказчика: {user}</p>
                    <p className='adminOrderCard__orderInfo-left-price'>Общая стоимость заказа: {totalCost.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
                    <p className='adminOrderCard__orderInfo-left-time'>Время заказа: {date[2]}.{date[1]}.{date[0]} {date[3]}:{date[4]}:{date[5]}</p>
                </div>
            </div>
            <div className='adminOrderCard__orderInfo-center'>
                <p className='adminOrderCard__orderInfo-center-header'>Информация по заказу</p>
                {orderInfo.map((data, index) => {
                    return(
                        <div key={index} className='adminOrderCard__orderInfo-center-product'>
                            <p className='adminOrderCard__orderInfo-center-product-header'>ID товара: {data.id}</p>
                            <p className='adminOrderCard__orderInfo-center-product-text'>Цена за штуку: {data.pricePerPiece.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
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