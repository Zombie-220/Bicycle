import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { DiffLink } from '../../components/DiffLink';
import { DivSlider } from '../../components/Sliders/divSlider';
import { LoopSlider } from '../../components/Sliders/loopSlider';
import { Slider } from '../../components/Sliders/slider';
import { Card } from '../../components/card';
import { Preloader } from '../../components/preloader';

import { useRequest } from '../../helpers/hooks/useRequest';

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
import mapMarker from '../../assets/images/main/contacts/mapMarker.svg';
import phone from '../../assets/images/main/contacts/phone.svg';
import position from '../../assets/images/main/contacts/position.svg';
import mail from '../../assets/images/main/contacts/mail.svg';
import calendar from '../../assets/images/main/contacts/calendar.svg';

import './style.scss';

export const MainPage = () => {
    const _date = new Date();
    const [cardsPerSlide, setCardsPerSlide] = useState(
        () => {
            if (window.innerWidth > 815) { return(3); }
            else if (window.innerWidth <= 700) { return(1); }
            else if (window.innerWidth <= 815) { return(2); }
        }
    );
    const handleResize = () => {
        if (window.innerWidth > 815) { setCardsPerSlide(3); }
        else if (window.innerWidth <= 700) { setCardsPerSlide(1); }
        else if (window.innerWidth <= 815) { setCardsPerSlide(2); }
    };

    const { newItems, newItemsLoading, newItemsError } = useRequest('/bicycles/latest/6', {
        data: 'newItems',
        loading: 'newItemsLoading',
        error: 'newItemsError'
    });
    const { winterBicycles, winterIsLoading, winterError } = useRequest(`/bicycles/filter?type=горный&startDate=01-01-${_date.getFullYear()-3}&endDate=30-12-${_date.getFullYear()-3}&amount=3`, {
        data: 'winterBicycles',
        loading: 'winterIsLoading',
        error: 'winterError'
    });
    const { equipments, equipmentLoading, equipmentError } = useRequest('/equipments/amount/9', {
        data: 'equipments',
        loading: 'equipmentLoading',
        error: 'equipmentError'
    });

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); }
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
                <h2 className='mainPage__cardSlider-header'>НОВИНКИ</h2>
                <div className='mainPage__cardSlider__slider'>
                    {!newItemsError ?
                        <Preloader isLoading={newItemsLoading}>
                            <Slider cardPerSlide={cardsPerSlide}>{
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
                                            discount = {data.discount}
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
                <h2 className='mainPage__catalog-header'>КАТАЛОГ</h2>
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
                                <Link id='mainPage__catalog-equipment' to={'/catalog/equipments'} className='mainPage__catalog__container__bottomSection-outerContainer-innerContainer-link'>ЭКИПИРОВКА</Link>
                                <Link id='mainPage__catalog-racks' to={'/catalog/racks'} className='mainPage__catalog__container__bottomSection-outerContainer-innerContainer-link'>ВЕЛОСТАНКИ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mainPage__video'>
                <div className='mainPage__video__header'>
                    <h2 className='mainPage__video__header-header'>НИЧЕГО НЕ СМОЖЕТ ОСТАНОВИТЬ ВАС</h2>
                    <div className='mainPage__video__header__container'>
                        <p className='mainPage__video__header__container-text'>Наша компания специализируется на продаже товаров для велосипедного спорта — велосипедов, запасных частей, аксессуаров и различного спортивного инвентаря для активного спорта и отдыха.</p>
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
                <h2 className='mainPage__winterBicycles-header'>ЛУЧШИЕ МОДЕЛИ ДЛЯ ЗИМНЕЙ КОЛЛЕКЦИИ {_date.getFullYear()-3}</h2>
                <div className='mainPage__winterBicycles__slider'>
                    {!winterError ?
                        <Preloader isLoading={winterIsLoading}>
                            <Slider cardPerSlide={cardsPerSlide}>{
                                winterBicycles.map((data, index) => {
                                    return (
                                        <Card
                                            key = {index}
                                            id = {data._id}
                                            itemName = {`${data.brand} ${data.model}`}
                                            itemCountry = {data.countryImage}
                                            itemAmount = {data.amount}
                                            itemImage = {data.productImage}
                                            itemPrice = {data.price}
                                            discount = {data.discount}
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
                <h2 className='mainPage__advantages-header'>ПРЕИМУЩЕСТВА</h2>
                <div className='mainPage__advantages__body'>
                    <div className='mainPage__advantages__body__rows'>
                        <div className='mainPage__advantages__body__rows__row' id='mainPage__advantages__section-1'>
                            <p className='mainPage__advantages__body__rows__row-header'>БЕСПЛАТНАЯ ДОСТАВКА</p>
                            <p className='mainPage__advantages__body__rows__row-text'>Мы пользуемся всеми популярными видами доставки</p>
                        </div>
                        <div className='mainPage__advantages__body__rows__row' id='mainPage__advantages__section-2'>
                            <p className='mainPage__advantages__body__rows__row-header'>ОБМЕН И ВОЗВРАТ</p>
                            <p className='mainPage__advantages__body__rows__row-text'>Все товары обеспечены фирменной гарантией фирм-производителей</p>
                        </div>
                    </div>
                    <div className='mainPage__advantages__body__rows'>
                        <div className='mainPage__advantages__body__rows__row' id='mainPage__advantages__section-3'>
                            <p className='mainPage__advantages__body__rows__row-header'>ДОП. ОБСЛУЖИВАНИЕ</p>
                            <p className='mainPage__advantages__body__rows__row-text'>Мы выполняем ремонт велосипеда любой сложности</p>
                        </div>
                        <div className='mainPage__advantages__body__rows__row' id='mainPage__advantages__section-4'>
                            <p className='mainPage__advantages__body__rows__row-header'>ОНЛАЙН ОПЛАТА</p>
                            <p className='mainPage__advantages__body__rows__row-text'>Для удобства вы можете оплатить товар банковской картой через сайт</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mainPage__equipment'>
                <h2 className='mainPage__equipment-header'>ЭКИПИРОВКА</h2>
                <div className='mainPage__equipment__slider'>
                    {!equipmentError ?
                        <Preloader isLoading={equipmentLoading}>
                            <Slider cardPerSlide={cardsPerSlide}>{
                                equipments.map((data, index) => {
                                    return (
                                        <Card
                                            key = {index}
                                            id = {data._id}
                                            itemName = {`${data.model[0].toUpperCase()+data.model.slice(1, data.model.length)} ${data.brand}`}
                                            itemAmount = {data.amount}
                                            itemImage = {data.productImage}
                                            itemPrice = {data.price}
                                            discount= {data.discount}
                                            linkTo = {`/catalog/equipments/${data._id}`}
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

            
            <div className='mainPage__map'>
                <h2 className='mainPage__map-header'>КОНТАКТЫ</h2>
                <MapContainer center={[55.723638, 37.568641]} zoom={16} style={{ height: "500px", width: "100%" }} zoomControl={false} attributionControl={false}>
                    <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png" />
                    <Marker position={[55.723638, 37.568641]} icon={new L.icon({iconUrl: mapMarker, iconSize: [80, 80], iconAnchor: [40, 80], popupAnchor: [0, -80]})}>
                        <Popup>World Bike<br/>ул. Доватора, 7/8 с.1, Москва</Popup>
                    </Marker>
                </MapContainer>
                <div className='mainPage__map__contacts'>
                    <div className='mainPage__map__contacts__section'>
                        <img src={phone} alt="phone" />
                        <div className='mainPage__map__contacts__section__mini'>
                            <p className='mainPage__map__contacts__section__mini-text'>+7 (495) 055-75-86</p>
                            <p className='mainPage__map__contacts__section__mini-text'>+7 (965) 142-22-99</p>
                        </div>
                    </div>
                    <div className='mainPage__map__contacts__section'>
                        <img src={position} alt="position" />
                        <div className='mainPage__map__contacts__section__mini'>
                            <p className='mainPage__map__contacts__section__mini-text'>г. Москва, ул.</p>
                            <p className='mainPage__map__contacts__section__mini-text'>Доватора, 7/8 с1</p>
                        </div>
                    </div>
                    <div className='mainPage__map__contacts__section'>
                        <img src={mail} alt="mail" />
                        <p className='mainPage__map__contacts__section-text'>order@world-bike.ru</p>
                    </div>
                    <div className='mainPage__map__contacts__section'>
                        <img src={calendar} alt="calendar" />
                        <div className='mainPage__map__contacts__section__mini'>
                            <p className='mainPage__map__contacts__section__mini-text'>Без выходных </p>
                            <p className='mainPage__map__contacts__section__mini-text'>10:00-20:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};