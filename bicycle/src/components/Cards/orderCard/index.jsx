import { useEffect, useState, useRef } from 'react';
import { API_URL } from '../../../requests/request';

import { Encrypt, Decrypt } from '../../../helpers/AES';

import './style.scss';

export const OrderCard = ({id, orderInfo, user, datetime, status}) => {
    const [buttonStatus, setButtonStatus] = useState(false);
    const [orderPrice, setOrderPrice] = useState(0);
    const selectRef = useRef(null);

    const handleStatusChange = (e) => {
        API_URL.post('/orders/updateStatus', {
            orderId: Encrypt(id),
            status: Encrypt(e.target.value)
        }).then(({ data }) => {
            console.log(Decrypt(data));
        }).catch((err) => { console.log(err); });
    };

    useEffect(() => {
        orderInfo.map((data) => { setOrderPrice(orderPrice + data.amount*data.price); });
        selectRef.current.value = status;
    }, []);

    return (
        <div className='orderCard'>
            <div className='orderCard__header'>
                <label htmlFor={`order-${id}`}>
                    <p className='orderCard__header-text'>ID заказа: <span>{id}</span></p>
                </label>
                <div className='orderCard__header-button'>
                    <input type="checkbox" id={`order-${id}`} onChange={(event) => { setButtonStatus(event.target.checked); }}/>
                    <label htmlFor={`order-${id}`}>
                        <div></div>
                        <div></div>
                    </label>
                </div>
            </div>
            <div className='orderCard__body' style={buttonStatus ? {height: `${125+orderInfo.length*100+106}px`} : {height: '0px'}}>
                <p className='orderCard__body-userInfo'>Заказ выполнен пользователем: <span>{user}</span></p>
                <p className='orderCard__body-userInfo'>Время оформления заказа: <span>{datetime.replaceAll('-', '.')}</span></p>
                <p className='orderCard__body-userInfo'>Информация по заказу:</p>
                <div className='orderCard__body__orderInfo'>
                        {orderInfo.map((data, index) => {
                            return (
                                <div className='orderCard__body__orderInfo__order'>
                                    <img className='orderCard__body__orderInfo__order-img' src={data.image} alt={`order-${data.name}`} />
                                    <p className='orderCard__body__orderInfo__order-title'>{data.name}</p>
                                    <p className='orderCard__body__orderInfo__order-amount'>{data.amount} шт.</p>
                                    <p className='orderCard__body__orderInfo__order-price'>{(data.price*data.amount).toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
                                </div>
                            )
                        })}
                </div>
                <p className='orderCard__body-itog'>Итого: <span>{orderPrice.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span> ₽</p>
                <div className='orderCard__body__statusCont'>
                    <p className='orderCard__body__statusCont-text'>Статус:</p>
                    <select className='orderCard__body__statusCont__select' onChange={handleStatusChange} ref={selectRef}>
                        <option value="0">Новый</option>
                        <option value="1">В работе</option>
                        <option value="2">Завершен</option>
                        <option value="3">Отклонен</option>
                    </select>
                </div>
            </div>
        </div>
    );
}