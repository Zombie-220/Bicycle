import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import wilievLogo from '../../assets/images/home/slider/wiliev.svg';
import wahooLogo from '../../assets/images/home/slider/wahoo.svg';
import trekLogo from '../../assets/images/home/slider/trek.svg';
import topeakLogo from '../../assets/images/home/slider/topeak.svg';
import tacxLogo from '../../assets/images/home/slider/tacx.svg';
import sramLogo from '../../assets/images/home/slider/sram.svg';
import shimanoLogo from '../../assets/images/home/slider/shimano.svg';
import image from '../../assets/images/Bianchi AQUILA L DURA ACE DI2 TEAM JUMBO 2021.png'

import './style.scss'
import '../../assets/fonts/fonts.css'

import { getBicycleData } from '../../api/getBicycleData';
import { Card } from '../../components/card';

export const Main = () => {
    const [bicycleData, setCardData] = useState([])

    useEffect(() => {
        setCardData(getBicycleData());
    }, [])

    return (
        <div className='main'>

            <div className='main__welcomeDiv'>
                <h1 className='main__welcomeDiv__header'>ЭЛЕКТРО<br/>ВЕЛОСИПЕДЫ</h1>
                <p className='main__welcomeDiv__text'>Cento10 Hybrid — это гоночный велосипед c помогающим<br/>педалированию электроприводом, который устанавливает новый,<br/>очень высокий стандарт для данной категории</p>
                <Link to='/bicycle' className='main__welcomeDiv__link'>Подробнее</Link>
            </div>
            <div className='main__slider'>
                <div className='main__slider__element'>
                    <p className='main__slider__text'>Экстремальное<br/>вождение на горном<br/>велосипеде</p>
                    <Link className='main__slider__link'>Подробнее</Link>
                </div>
                <div className='main__slider__element'>
                    <p className='main__slider__text'>Велосипеды<br/>для профессионалов</p>
                    <Link className='main__slider__link'>Подробнее</Link>
                </div>
                <div className='main__slider__element'>
                    <p className='main__slider__text'>Долгая поездка<br/>на шоссейном велосипеде</p>
                    <Link className='main__slider__link'>Подробнее</Link>
                </div>
            </div>
            <div className='main__imageSlider'>
                    <img src={wilievLogo} alt={wilievLogo} className='main__imageSlider__image'/>
                    <img src={wahooLogo} alt={wahooLogo} className='main__imageSlider__image'/>
                    <img src={trekLogo} alt={trekLogo} className='main__imageSlider__image'/>
                    <img src={topeakLogo} alt={topeakLogo} className='main__imageSlider__image'/>
                    <img src={tacxLogo} alt={tacxLogo} className='main__imageSlider__image'/>
                    <img src={sramLogo} alt={sramLogo} className='main__imageSlider__image'/>
                    <img src={shimanoLogo} alt={shimanoLogo} className='main__imageSlider__image'/>
            </div>

            {/* {bicycleData.map((data, index) => (
                <Card
                    imageURL={image}
                    name={data.name}
                    price={data.price}
                />
            ))} */}

        </div>
    );
};
