import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useRequest } from '../../../helpers/hooks/useRequest';
import { API_URL } from '../../../requests/request';
import { Encrypt, Decrypt } from '../../../helpers/AES';
import { AuthContext } from '../../../App';

import { ModalPopup } from '../../../components/popup';

import './style.scss';

import ok from '../../../assets/images/catalogById/ok.svg';
import vk from '../../../assets/images/catalogById/vk.svg';
import tg from '../../../assets/images/catalogById/tg.svg';
import wp from '../../../assets/images/catalogById/whatsapp.svg';
import telephone from '../../../assets/images/catalogById/phone.svg';
import like from '../../../assets/images/catalogById/like.svg';

export const CatalogById = () => {
    const { isAuth } = useContext(AuthContext);
    const [currentCategory, setCurrentCategory] = useState('');
    const [itemName, setItemName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { category, id } = useParams();
    const { itemData, itemLoading, itemError } = useRequest(`/${category}/${id}`, {
        data: 'itemData',
        loading: 'itemLoading',
        error: 'itemError'
    });

    const { register, handleSubmit, watch } = useForm();
    const addToCart = (formData) => {
        const orderId = localStorage.getItem('OrId') ? JSON.parse(localStorage.getItem('OrId')) : null;
        const timestamp = new Date();
        const orderData = Encrypt({
            id: orderId,
            userId: isAuth,
            orderInfo: {
                id: id,
                size: formData.size ? formData.size : itemData.size[0],
                color: formData.color ? formData.color : itemData.color[0],
                amount: currentAmount
            },
            timestamp: `${(timestamp.getDate()).toString().padStart(2, '0')}-${(timestamp.getMonth()+1).toString().padStart(2, '0')}-${(timestamp.getFullYear()).toString().padStart(2, '0')} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`
        });
        
        API_URL.post('/orders/createOrder', orderData).then(({ data }) => {
            const decryptedResp = Decrypt(data);
            if (decryptedResp.response === "order created") {
                localStorage.setItem('OrId', JSON.stringify(decryptedResp.id));
            }
            setShowModal(true);
        }).catch((err) => { console.log(err); });
        setShowModal(true);
    }

    const handleLike = () => { console.log(`like ${id}`); }

    const currentSize = watch('size');
    const [activeSize, setActiveSize] = useState(null);
    useEffect(() => { setActiveSize(currentSize); }, [currentSize]);

    const currentCollor = watch('color');
    const [activeColor, setActiveColor] = useState(null);
    useEffect(() => { setActiveColor(currentCollor); }, [currentCollor]);

    const [currentAmount, setCurrentAmount] = useState(0);
    const plusAmount = () => {if (currentAmount < itemData.amount) { setCurrentAmount(currentAmount + 1); }}
    const minusAmount = () => {if (currentAmount > 1) { setCurrentAmount(currentAmount - 1); }}

    useEffect(() => {
        switch (category) {
            case 'bicycles':
                setCurrentCategory('Велосипеды');
                setItemName(`${itemData.brand} ${itemData.model}`);
                break;
            case 'equipments':
                setCurrentCategory('Экипировка');
                setItemName(`${itemData.name}`);
                break;
        }
    }, [category, itemData]);

    useEffect(() => {
        if (itemData.color && itemData.size) {
            if (activeColor === null || activeColor === undefined) { setActiveColor(itemData.color[0]); }
            if (activeSize === null || activeSize === undefined) { setActiveSize(itemData.size[0]); }
        }
    }, [activeColor, activeSize, itemData]);

    useEffect(() => {
        setTimeout(() => { setShowModal(false); }, 12500);
    }, [showModal]);

    return (
        <div className="catalogById">
            <div className='catalogById__link'>
                <div className='catalogById__link'>
                    <Link className='catalogById__link-link' to={'/'}>Главная</Link>
                    <p className='catalogById__link-separator'>/</p>
                    <Link className='catalogById__link-link' to={`/catalog/${category}`}>{currentCategory}</Link>
                    <p className='catalogById__link-separator'>/</p>
                    <Link className='catalogById__link-link-orange'>{itemName}</Link>
                </div>
            </div>
            <form className='catalogById__basicInfo'>
                <div className='catalogById__basicInfo__images'>
                    <img src={itemData.productImage} alt="productImg" className='catalogById__basicInfo__images-mainImg' />
                </div>
                <div className='catalogById__basicInfo__info'>
                    <p className='catalogById__basicInfo__info-model'>{category === 'bicycles' ? itemData.model : itemData.name}</p>
                    <p className='catalogById__basicInfo__info-brand'>{itemData.brand}</p>
                    <div className='catalogById__basicInfo__info__articul'>
                        <p className='catalogById__basicInfo__info__articul-text'>Артикул: 7655-188</p>
                        <div className='catalogById__basicInfo__info__articul-socialMedia'>
                            <img src={ok} alt="ok" className='catalogById__basicInfo__info__articul-socialMedia-img'/>
                            <img src={vk} alt="vk" className='catalogById__basicInfo__info__articul-socialMedia-img'/>
                            <img src={tg} alt="tg" className='catalogById__basicInfo__info__articul-socialMedia-img'/>
                            <img src={wp} alt="wp" className='catalogById__basicInfo__info__articul-socialMedia-img'/>
                            <img src={telephone} alt="telephone" className='catalogById__basicInfo__info__articul-socialMedia-img'/>
                        </div>
                    </div>
                    <p className={`catalogById__basicInfo__info-amount-${itemData.amount >= 1 ? 'green' : 'red'}`}>{itemData.amount >= 1 ? 'В наличии' : 'Распродано' }</p>
                    <div className='catalogById__basicInfo__info__price'>
                        {itemData.discount === 0 ?
                            <p className='catalogById__basicInfo__info__price-price'>{itemData.price?.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
                            :
                            <>
                                <p className='catalogById__basicInfo__info__price-price'>{(itemData.price - itemData.price * itemData.discount / 100)?.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
                                <p className='catalogById__basicInfo__info__price-discount'>{itemData.price?.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
                            </>
                        }
                    </div>
                    <p className='catalogById__basicInfo__info-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste voluptatum sint, non mollitia, ullam molestiae magni in distinctio, corrupti amet cumque laudantium modi adipisci. Sunt minima reprehenderit accusantium?</p>
                    <p className='catalogById__basicInfo__info-sizesHeader'>Размеры:</p>
                    <div className='catalogById__basicInfo__info__sizes'>
                        {itemData.size?.map((data, index) => {
                            return (
                                <label htmlFor={`size-${data}`} className='catalogById__basicInfo__info__sizes__button'
                                    style={ data === activeSize ? { backgroundColor: '#101010', color: '#FFF' } : { backgroundColor: '#0000', color: '#2E2E2E' } } key={index}>
                                    <input type="radio" id={`size-${data}`} name='size'
                                        value={data} className='catalogById__basicInfo__info__sizes__button-input' {...register('size')}
                                        onChange={(event) => { register('size').onChange(event); }}
                                        checked={data === activeSize}/>
                                    <label htmlFor={`size-${data}`} className='catalogById__basicInfo__info__sizes__button-label'>{data}</label>
                                </label>
                            )
                        })}
                    </div>
                    <p className='catalogById__basicInfo__info-colorsHeader'>Цвета:</p>
                    <div className='catalogById__basicInfo__info__colors'>
                        {itemData.color?.map((data, index) => {
                            return (
                                <label htmlFor={`color-${data}`} className='catalogById__basicInfo__info__colors__button'
                                    style={ data === activeColor ? { backgroundColor: `${data}`, border: '5px solid #E5E5E5' } : { backgroundColor: `${data}`, border: '1px solid #E5E5E5' } } key={index}>
                                    <input type="radio" id={`color-${data}`} name='color'
                                        value={data} className='catalogById__basicInfo__info__colors__button-input' {...register('color')}
                                        onChange={(event) => { register('color').onChange(event); }}
                                        checked={data === activeColor}/>
                                </label>
                            )
                        })}
                    </div>
                    <div className='catalogById__basicInfo__info__buttons'>
                        <div className='catalogById__basicInfo__info__buttons__amount'>
                            <button className='catalogById__basicInfo__info__buttons__amount-minus' type='button' onClick={minusAmount}>-</button>
                            <p className='catalogById__basicInfo__info__buttons__amount-amount'>{currentAmount}</p>
                            <button className='catalogById__basicInfo__info__buttons__amount-plus' type='button' onClick={plusAmount}>+</button>
                        </div>
                        <button className='catalogById__basicInfo__info__buttons-orderButton' type='submit' onClick={handleSubmit(addToCart)} disabled={currentAmount <= 0 ? true : false}>В корзину</button>
                    </div>
                </div>
            </form>
            <ModalPopup isShow={showModal} setIsShow={setShowModal} type='success'>
                <div>Заказ успешно добавлен в карзину</div>
            </ModalPopup>
        </div>
    );
}