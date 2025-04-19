import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { API_URL } from '../../../requests/request';

import './style.scss';

export const ItemCard = ({ id, title, image, amount, price, discount }) => {
    const { register, handleSubmit, setValue } = useForm();
    const changeItem = (formData) => {
        API_URL.post('/bicycles/change', {
            id: id,
            title: formData.title,
            amount: formData.amount,
            value: formData.value,
            discount: formData.discount
        });
    };

    const [_title, set_title] = useState(title);

    const [buttonStatus, setButtonStatus] = useState(false);
    const titleRef = useRef(null);
    const valueRef = useRef(null);
    const amountRef = useRef(null);
    const discountRef = useRef(null);

    useEffect(() => {
        setValue('title', title);
        setValue('value', price);
        setValue('amount', amount);
        setValue('discount', discount);
    }, []);

    return (
        <div className='bicycleCard'>
            <div className='bicycleCard__header'>
                <label htmlFor={`item-${id}`}>
                    <p className='bicycleCard__header-text'>ID товара: <span>{id}</span></p>
                </label>
                <div className='bicycleCard__header-button'>
                    <input type="checkbox" id={`item-${id}`} onChange={(event) => { setButtonStatus(event.target.checked); }}/>
                    <label htmlFor={`item-${id}`}>
                        <div></div>
                        <div></div>
                    </label>
                </div>
            </div>
            <form className='bicycleCard__body' style={buttonStatus ? {height: `306px`} : {height: '0px'}} onSubmit={handleSubmit(changeItem)}>
                <div className='bicycleCard__body__img'>
                    <img src={image} alt="" className='bicycleCard__body__img-img'/>
                    <div className='bicycleCard__body__img__input'>
                        <p className=''>Название: </p>
                        <input type="text" onChange={(e) => { set_title(e.target.value) }} ref={titleRef} name='title' {...register('title', { required: true })}/>
                    </div>
                </div>
                <div className='bicycleCard__body__info'>
                    <div className='bicycleCard__body__info__input'>
                        <p className=''>Стоимость за единицу: </p>
                        <input type="number" value={price} ref={valueRef} {...register('value', { required: true })}/>
                    </div>
                    <div className='bicycleCard__body__info__input'>
                        <p className=''>Количество на складе: </p>
                        <input type="number" value={amount} ref={amountRef} {...register('amount', { required: true })}/>
                    </div>
                    <div className='bicycleCard__body__info__input'>
                        <p className=''>Скидка: </p>
                        <input type="number" value={discount} ref={discountRef} {...register('discount', { required: true })}/>
                    </div>
                    <button className='bicycleCard__body-button'>Сохранить</button>
                </div>
            </form>
        </div>
    );
}