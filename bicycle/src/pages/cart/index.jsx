import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useRequest } from '../../helpers/hooks/useRequest';
import { API_URL } from '../../requests/request';
import { Decrypt, Encrypt } from '../../helpers/AES';

import { CartCard } from '../../components/Cards/cartCard';
import { ModalWindow } from '../../components/modalWin';
import { ValidateInput } from '../../components/ValidateInputs/Input';
import { ModalPopup } from '../../components/popup';

import './style.scss';

export const CartPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [orderPrice, setOrderPrice] = useState(0);
    const [orderDiscount, setOrderDiscount] = useState(0);
    const [orderFinal, setOrderFinal] = useState(0);
    const [orderItems, setOrderItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm();
    const paymentType1 = useRef();

    const { orderData, orderIsLoading, orderIsErr } = useRequest(`/orders/getOrder/${JSON.parse(localStorage.getItem('OrId'))}`, {
        data: 'orderData',
        loading: 'orderIsLoading',
        error: 'orderIsErr'
    });

    const deleteItem = (id) => {
        API_URL.post('/orders/deleteItem', {
            orderId: Encrypt(JSON.parse(localStorage.getItem('OrId'))),
            itemId: Encrypt(id)
        }).then(({data}) => {
            const decryptedData = Decrypt(data);
            if (decryptedData.response ==='item deleted') {
                setOrderItems({
                    orderId: decryptedData.orderId,
                    orderInfo: orderItems.orderInfo.filter((val) => {if (val.itemId != id) { return val; }})
                })
            }
        }).catch((err) => { console.log('something wrong >_<'); })
    }

    const sendOrder = () => {
        API_URL.patch('/orders/updateStatus', {
            orderId: Encrypt(JSON.parse(localStorage.getItem('OrId'))),
            status: Encrypt(1)
        }).then(({ data }) => {
            if (Decrypt(data.response) === 'status updated') {
                localStorage.removeItem('OrId');
                setShowPopup(true);
                setModalIsOpen(false);
            }
        }).catch((err) => { console.log(err); })
    }

    const paymentOperation = (formData) => {
        const paymentData = {
            ...formData,
            orderID: JSON.parse(localStorage.getItem('OrId'))
        };

        API_URL.post('/users/payment', paymentData).then(({ data }) => {
            sendOrder();
        }).catch((err) => { console.log(err); });
    }

    useEffect(() => {
        let newOrderPrice = 0;
        let newOrderDiscount = 0;

        orderItems?.orderInfo?.map((data) => {
            newOrderPrice += data.price * data.amount;
            newOrderDiscount += (data.price * data.discount / 100) * data.amount;
        });

        setOrderPrice(newOrderPrice);
        setOrderDiscount(newOrderDiscount);
        setOrderFinal(newOrderPrice - newOrderDiscount);
    }, [orderItems]);

    useEffect(() => { setOrderItems(orderData) }, [orderData]);

    useEffect(() => {
        if (paymentType1.current) { paymentType1.current.checked = true; }
    }, []);

    useEffect(() => {
        setTimeout(() => { setShowPopup(false); }, 12500);
    }, [showPopup]);

    return (
        <div className='cartPage'>
            <p className='cartPage__links'>
                <Link to='/' className='cartPage__links-link'>Главная</Link>
                <span>/</span>
                <Link to='/cart' className='cartPage__links-link'>Корзина</Link>
            </p>
            <div className='cartPage__body'>
                <h1 className='cartPage__body-header'>Корзина</h1>
                <div className='cartPage__body__wrapper'>
                    <div className='cartPage__body__wrapper__items'>
                        <div className='cartPage__body__wrapper__items-header'>
                            <Link to='/catalog/bicycles?page=1' className='cartPage__body__wrapper__items-header-link'>Вернуться к покупкам</Link>
                        </div>
                        <div className='cartPage__body__wrapper__items__itemsList'>
                            {orderItems?.orderInfo?.map((data, key) => {
                                return (
                                    <CartCard
                                        key={key}
                                        id={data.itemId}
                                        image={data.image}
                                        title={data.title}
                                        amount={data.amount}
                                        price={data.price}
                                        discount={data.discount}
                                        maxAmount={data.maxAmount}
                                        deleteItemCallback={() => { deleteItem(data.itemId); }}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className='cartPage__body__wrapper__order'>
                        <p className='cartPage__body__wrapper__order-text'>Номер заказа<br/><span>{orderData.orderId}</span></p>
                        <p className='cartPage__body__wrapper__order-text'>Сумма заказа (без скидки)<br/><span>{orderPrice.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</span></p>
                        <p className='cartPage__body__wrapper__order-text'>Скидка<br/><span>{orderDiscount.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</span></p>
                        <p className='cartPage__body__wrapper__order-finalPrice'>Итого<br/><span>{orderFinal.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</span></p>
                        <button className='cartPage__body__wrapper__order-button' onClick={() => { setModalIsOpen(true) }} disabled={!localStorage.getItem('OrId') ? true : false}>Оформить заказ</button>
                    </div>
                </div>
            </div>
            <ModalWindow isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
                <div className='cartPage__modal'>
                    <p className='cartPage__modal-header'>Метод оплаты</p>
                    <div className='cartPage__modal__container'>
                        <label htmlFor='payment-1' className='cartPage__modal__container-option'>При получении</label>
                        <div className='cartPage__modal__container-radio'>
                            <input type="radio" name='payment' id='payment-1' ref={paymentType1} onClick={() => { setShowForm(false) }}/>
                            <label htmlFor="payment-1"></label>
                        </div>
                    </div>
                    <div className='cartPage__modal__container'>
                        <label htmlFor='payment-2' className='cartPage__modal__container-option'>По карте</label>
                        <div className='cartPage__modal__container-radio'>
                            <input type="radio" name='payment' id='payment-2' onClick={() => { setShowForm(true) }}/>
                            <label htmlFor="payment-2"></label>
                        </div>
                    </div>
                    <form className='cartPage__modal__form' onSubmit={handleSubmit(paymentOperation)} style={{display: `${showForm ? 'block' : 'none'}`}}>
                        <p className='cartPage__modal__form-header'>Введите данные карты</p>
                        <ValidateInput
                            name={'cardNumber'}
                            errors={errors}
                            textLabel={'Номер карты'}
                            type={'number'}
                            formFunction={register}
                        />
                        <ValidateInput
                            name={'cardFIO'}
                            errors={errors}
                            textLabel={'Фамилия, Имя'}
                            formFunction={register}
                        />
                        <div className='cartPage__modal__form__container'>
                            <div className='cartPage__modal__form__container__input'>
                                <ValidateInput
                                    name={'cardMonth'}
                                    errors={errors}
                                    textLabel={'Месяц'}
                                    type={'number'}
                                    formFunction={register}
                                />
                            </div>
                            <div className='cartPage__modal__form__container__input'>
                                <ValidateInput
                                    name={'cardYear'}
                                    errors={errors}
                                    type={'number'}
                                    textLabel={'Год'}
                                    formFunction={register}
                                />
                            </div>
                            <div className='cartPage__modal__form__container__input'>
                                <ValidateInput
                                    name={'cardCVV'}
                                    errors={errors}
                                    type={'number'}
                                    textLabel={'CVV/CVC'}
                                    formFunction={register}
                                />  
                            </div>
                        </div>
                        <button className='cartPage__modal__form-button'>Оплатить</button>
                    </form>
                    <button className='cartPage__modal__form-button' style={{display: `${showForm ? 'none' : 'block'}`}} onClick={sendOrder}>Оформить заказ</button>
                </div>
            </ModalWindow>
            <ModalPopup isShow={showPopup} setIsShow={setShowPopup} type={'success'}>
                <p className='cartPage__modal-text'>Заказ успешно оформлен</p>
            </ModalPopup>
        </div>
    );
}