import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DiffLink } from '../../components/DiffLink';
import { DivSlider } from '../../components/Sliders/divSlider';
import { LoopSlider } from '../../components/Sliders/loopSlider';
import { Slider } from '../../components/Sliders/slider';
import { Card } from '../../components/card';
import { Preloader } from '../../components/preloader';

import { API_URL } from '../../requests/request';
import { Decrypt } from '../../helpers/AES';

import wiliev from '../../assets/images/main/loopSlider/wiliev.svg'; 
import wahoo from '../../assets/images/main/loopSlider/wahoo.svg'; 
import trek from '../../assets/images/main/loopSlider/trek.svg'; 
import shimano from '../../assets/images/main/loopSlider/shimano.svg'; 
import topeak from '../../assets/images/main/loopSlider/topeak.svg'; 
import tacx from '../../assets/images/main/loopSlider/tacx.svg'; 
import sram from '../../assets/images/main/loopSlider/sram.svg'; 
import videoPoster from '../../assets/images/main/video/playerPoster.svg';
import playerVideo from '../../assets/images/main/video/playerVideo.mp4';
import diamond from '../../assets/images/main/video//diamond.svg';
import guarantee from '../../assets/images/main/video/guarantee.svg';
import gear from '../../assets/images/main/video/gear.svg';
import hours_24 from '../../assets/images/main/video/24-hours.svg';

import './style.scss';

export const MainPage = () => {
    const [newItems, setNewItems] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(true);
    const [newItemsError, setNewItemsError] = useState(false);

    const [winterBicycle, setWinterBicycle] = useState([]);
    const [winterIsLoading, setWinterIsLoading] = useState(true);
    const [winterError, setWinterError] = useState(false);

    const [equipments, setEquipment] = useState([]);
    const [equipmentLoading, setEquipmentLoading] = useState(true);
    const [equipmentErr, setEquipmentErr] = useState(false);

    useEffect(() => {
        API_URL('/bicycles/amount/6').then(({ data }) => {
            var decryptedData = [];
            data.map((dataMap) => {
                return (decryptedData.push({
                    _id: Decrypt(dataMap._id),
                    brand: Decrypt(dataMap.brand),
                    model: Decrypt(dataMap.model),
                    productImage: dataMap.productImage,
                    countryImage: dataMap.countryImage,
                    price: parseInt(Decrypt(dataMap.price)),
                    amount: parseInt(Decrypt(dataMap.amount)),
                    discount: parseInt(Decrypt(dataMap.discount))
                }));
            });

            setNewItems(decryptedData);
            setNewItemsLoading(false);
            setNewItemsError(false);
        }).catch(() => { setNewItemsError(true); })

        API_URL('/bicycles/amount/3').then(({ data }) => {
            var decryptedData = [];
            data.map((dataMap) => {
                return (decryptedData.push({
                    _id: Decrypt(dataMap._id),
                    brand: Decrypt(dataMap.brand),
                    model: Decrypt(dataMap.model),
                    productImage: dataMap.productImage,
                    countryImage: dataMap.countryImage,
                    price: parseInt(Decrypt(dataMap.price)),
                    amount: parseInt(Decrypt(dataMap.amount)),
                    discount: parseInt(Decrypt(dataMap.discount))
                }));
            });

            setWinterBicycle(decryptedData);
            setWinterIsLoading(false);
            setWinterError(false);
        }).catch(() => { setWinterError(true); })

        API_URL('/equipments/amount/9').then(({ data }) => {
            var decryptedData = [];
            data.map((dataMap) => {
                return (decryptedData.push({
                    _id: Decrypt(dataMap._id),
                    name: Decrypt(dataMap.name),
                    productImage: dataMap.productImage,
                    price: parseInt(Decrypt(dataMap.price)),
                    amount: parseInt(Decrypt(dataMap.amount)),
                    discount: parseInt(Decrypt(dataMap.discount))
                }));
            })

            setEquipment(decryptedData);
            setEquipmentLoading(false);
            setEquipmentErr(false);
        }).catch(() => { setEquipmentErr(true); })
    }, []);

    return (
        <div className='mainPage'>
            <div className='mainPage__welcomeDiv'>
                <h1 className='mainPage__welcomeDiv__header'>ЭЛЕКТРО<br/>ВЕЛОСИПЕДЫ</h1>
                <p className='mainPage__welcomeDiv__text'>Cento10 Hybrid — это гоночный велосипед c помогающим<br/>педалированию электроприводом, который устанавливает новый,<br/>очень высокий стандарт для данной категории</p>
                <DiffLink to={'/catalog/bicycles'} className='mainPage__welcomeDiv__link'>Подробнее</DiffLink>
            </div>
            <div className='mainPage__divSlider'>
                <DivSlider>
                    <div className='mainPage__divSlider__child'>
                        <p className='mainPage__divSlider__child-text'>Экстремальное вождение на горном велосипеде</p>
                        <Link to={'/blog/x'} className={`mainPage__divSlider__child-link`}>Подробнее</Link>
                    </div>
                    <div className='mainPage__divSlider__child'>
                        <p className='mainPage__divSlider__child-text'>Велосипеды для профессионалов</p>
                        <Link to={'/blog/x'} className={`mainPage__divSlider__child-link`}>Подробнее</Link>
                    </div>
                    <div className='mainPage__divSlider__child'>
                        <p className='mainPage__divSlider__child-text'>Долгая поездка на шоссейном велосипеде</p>
                        <Link to={'/blog/x'} className='mainPage__divSlider__child-link'>Подробнее</Link>
                    </div>
                </DivSlider>
            </div>
            <div className='mainPage__loopSlider'>
                <LoopSlider>
                    <img className='mainPage__loopSlider-img' src={wiliev} alt="wiliev" />
                    <img className='mainPage__loopSlider-img' src={wahoo} alt="wahoo" />
                    <img className='mainPage__loopSlider-img' src={trek} alt="trek" />
                    <img className='mainPage__loopSlider-img' src={shimano} alt="shimano" />
                    <img className='mainPage__loopSlider-img' src={topeak} alt="topeak" />
                    <img className='mainPage__loopSlider-img' src={tacx} alt="tacx" />
                    <img className='mainPage__loopSlider-img' src={sram} alt="sram" />
                </LoopSlider>
            </div>
            <div className='mainPage__cardSlider'>
                <p className='mainPage__cardSlider-header'>НОВИНКИ</p>
                <div className='mainPage__cardSlider__slider'>
                    {!newItemsError ?
                        <Preloader isLoading={newItemsLoading}>
                            <Slider cardPerSlide={3}>{
                                newItems.map((data, index) => {
                                    return (
                                        <Card
                                            key = {index}
                                            id = {data._id}
                                            itemName = {`${data.brand} ${data.model}`}
                                            itemCountry = {data.countryImage}
                                            itemAmount = {data.amount}
                                            itemImage = {data.productImage}
                                            itemPrice = {data.price}
                                            linkTo = {`/catalog/bicycles/${data._id}`}
                                        />
                                    );
                                })
                            }</Slider>
                        </Preloader> : <p className='mainPage__cardSlider__slider-error'>Сайту на хорошо @_@. Попробуйте позже.</p>
                    }
                </div>
                {!newItemsLoading && <Link to='/catalog/bicycles' className='mainPage__cardSlider-link'>ПОКАЗАТЬ ВСЕ</Link>}
            </div>
            <div className='mainPage__catalog'>
                <p className='mainPage__catalog-header'>КАТАЛОГ</p>
                <div className='mainPage__catalog__container'>
                    <Link to='/catalog/bicycles' className='mainPage__catalog__container-link'>ВЕЛОСИПЕДЫ</Link>
                    <div className='mainPage__catalog__container__bottomSection'>
                        <Link className='mainPage__catalog__container__bottomSection-link'>TRADE-IN</Link>
                        <div className='mainPage__catalog__container__bottomSection-outerContainer'>
                            <div className='mainPage__catalog__container__bottomSection-outerContainer-innerContainer'>
                                <Link id='mainPage__catalog-parts' to={'/catalog/parts'} className='mainPage__catalog__container__bottomSection-outerContainer-innerContainer-link'>ЗАПЧАСТИ</Link>
                                <Link id='mainPage__catalog-accessories' to={'/catalog/accessories'} className='mainPage__catalog__container__bottomSection-outerContainer-innerContainer-link'>АКСЕССУАРЫ</Link>
                            </div>
                            <div className='mainPage__catalog__container__bottomSection-outerContainer-innerContainer'>
                                <Link id='mainPage__catalog-equipment' to={'/catalog/equipment'} className='mainPage__catalog__container__bottomSection-outerContainer-innerContainer-link'>ЭКИПИРОВКА</Link>
                                <Link id='mainPage__catalog-racks' to={'/catalog/racks'} className='mainPage__catalog__container__bottomSection-outerContainer-innerContainer-link'>ВЕЛОСТАНКИ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mainPage__video'>
                <div className='mainPage__video__header'>
                    <p className='mainPage__video__header-header'>НИЧЕГО НЕ СМОЖЕТ ОСТАНОВИТЬ ВАС</p>
                    <div className='mainPage__video__header__container'>
                        <p className='mainPage__video__header__container-text'>Наша компания специализируется на продаже товаров для велосипедного спорта — велосипедов, запасных частей, аксессуаров и различного спортивного инвентаря для активного спорта и отдыха.</p>
                        <Link to={'/blog/x'} className='mainPage__video__header__container-link'>Подробнее</Link>
                    </div>
                </div>
                <div className='mainPage__video__body'>
                    <video poster={videoPoster} controls className="mainPage__video__body-player">
                        <source src={playerVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className='mainPage__video__footer'>
                    <div className='mainPage__video__footer__section'>
                        <div className='mainPage__video__footer__section__header'>
                            <img className='mainPage__video__footer__section__header-img' src={diamond} alt="diamond" />
                            <p className='mainPage__video__footer__section__header-text'>Европейские бренды</p>
                        </div>
                        <p className='mainPage__video__footer__section-text'>Представляем десятки европейских брендов</p>
                    </div>
                    <div className='mainPage__video__footer__section'>
                        <div className='mainPage__video__footer__section__header'>
                            <img className='mainPage__video__footer__section__header-img' src={guarantee} alt="guarantee" />
                            <p className='mainPage__video__footer__section__header-text'>Вечная гарантия</p>
                        </div>
                        <p className='mainPage__video__footer__section-text'>На некоторые бренды предоставляем пожизненную гарантию</p>
                    </div>
                    <div className='mainPage__video__footer__section'>
                        <div className='mainPage__video__footer__section__header'>
                            <img className='mainPage__video__footer__section__header-img' src={gear} alt="gear" />
                            <p className='mainPage__video__footer__section__header-text'>Предпродажная настройка</p>
                        </div>
                        <p className='mainPage__video__footer__section-text'>Специалисты настроят ваш велосипед наилучшим образом</p>
                    </div>
                    <div className='mainPage__video__footer__section'>
                        <div className='mainPage__video__footer__section__header'>
                            <img className='mainPage__video__footer__section__header-img' src={hours_24} alt="hours_24" />
                            <p className='mainPage__video__footer__section__header-text'>Доставка за 24 часа</p>
                        </div>
                        <p className='mainPage__video__footer__section-text'>Доставляем товар всеми популярными транспортными компаниями</p>
                    </div>
                </div>
            </div>
            <div className='mainPage__winterBicycles'>
                <p className='mainPage__winterBicycles-header'>ЛУЧШИЕ МОДЕЛИ ДЛЯ ЗИМНЕЙ КОЛЛЕКЦИИ</p>
                <div className='mainPage__winterBicycles__slider'>
                    {!winterError ?
                        <Preloader isLoading={winterIsLoading}>
                            <Slider cardPerSlide={3}>{
                                winterBicycle.map((data, index) => {
                                    return (
                                        <Card
                                            key = {index}
                                            id = {data._id}
                                            itemName = {`${data.brand} ${data.model}`}
                                            itemCountry = {data.countryImage}
                                            itemAmount = {data.amount}
                                            itemImage = {data.productImage}
                                            itemPrice = {data.price}
                                            linkTo = {`/catalog/bicycles/${data._id}`}
                                        />
                                    );
                                })
                            }</Slider>
                        </Preloader> : <p className='mainPage__winterBicycles__slider-error'>Сайту на хорошо @_@. Попробуйте позже.</p>
                    }
                </div>
            </div>
            <div className='mainPage__advantages'>
                <p className='mainPage__advantages-header'>ПРЕИМУЩЕСТВА</p>
                <div className='mainPage__advantages__body'>
                    <div className='mainPage__advantages__body__rows'>
                        <div className='mainPage__advantages__body__rows__row' id='mainPage__advantages__section-1'>
                            <p className='mainPage__advantages__body__rows__row-header'>БЕСПЛАТНАЯ ДОСТАВКА</p>
                            <p className='mainPage__advantages__body__rows__row-text'>Мы пользуемся всеми популярными видами доставки</p>
                            <Link className='mainPage__advantages__body__rows__row-link'>Подробнее</Link>
                        </div>
                        <div className='mainPage__advantages__body__rows__row' id='mainPage__advantages__section-2'>
                            <p className='mainPage__advantages__body__rows__row-header'>ОБМЕН И ВОЗВРАТ</p>
                            <p className='mainPage__advantages__body__rows__row-text'>Все товары обеспечены фирменной гарантией фирм-производителей</p>
                            <Link className='mainPage__advantages__body__rows__row-link'>Подробнее</Link>
                        </div>
                    </div>
                    <div className='mainPage__advantages__body__rows'>
                        <div className='mainPage__advantages__body__rows__row' id='mainPage__advantages__section-3'>
                            <p className='mainPage__advantages__body__rows__row-header'>ДОП. ОБСЛУЖИВАНИЕ</p>
                            <p className='mainPage__advantages__body__rows__row-text'>Мы выполняем ремонт велосипеда любой сложности</p>
                            <Link className='mainPage__advantages__body__rows__row-link'>Подробнее</Link>
                        </div>
                        <div className='mainPage__advantages__body__rows__row' id='mainPage__advantages__section-4'>
                            <p className='mainPage__advantages__body__rows__row-header'>ОНЛАЙН ОПЛАТА</p>
                            <p className='mainPage__advantages__body__rows__row-text'>Для удобства вы можете оплатить товар банковской картой через сайт</p>
                            <Link className='mainPage__advantages__body__rows__row-link'>Подробнее</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mainPage__equipment'>
                <p className='mainPage__equipment-header'>ЭКИПИРОВКА</p>
                <div className='mainPage__equipment__slider'>
                    {!equipmentErr ?
                        <Preloader isLoading={equipmentLoading}>
                            <Slider cardPerSlide={3}>{
                                equipments.map((data, index) => {
                                    return (
                                        <Card
                                            key = {index}
                                            id = {data._id}
                                            itemName = {data.name}
                                            itemAmount = {data.amount}
                                            itemImage = {data.productImage}
                                            itemPrice = {data.price}
                                            linkTo = {`/catalog/equipment/${data._id}`}
                                        />
                                    );
                                })
                            }</Slider>
                        </Preloader> : <p className='mainPage__equipment__slider-error'>Сайту на хорошо @_@. Попробуйте позже.</p>
                    }
                </div>
            </div>
            <div className='mainPage__reviews'>
                <p className='mainPage__reviews-header'>ПОСЛЕДНИЕ ОБЗОРЫ</p>
                <div className='mainPage__reviews__container'>
                    будь так добр добавить сюда слайдер с обзорами (их просто пока в базе нет)
                </div>
            </div>
        </div>
    );
};