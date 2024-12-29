import React from 'react';
import { Link } from 'react-router-dom';

import { DiffLink } from '../../components/DiffLink';
import { DivSlider } from '../../components/Sliders/divSlider';
import { LoopSlider } from '../../components/Sliders/loopSlider';

import wiliev from '../../assets/images/main/loopSlider/wiliev.svg'; 
import wahoo from '../../assets/images/main/loopSlider/wahoo.svg'; 
import trek from '../../assets/images/main/loopSlider/trek.svg'; 
import shimano from '../../assets/images/main/loopSlider/shimano.svg'; 
import topeak from '../../assets/images/main/loopSlider/topeak.svg'; 
import tacx from '../../assets/images/main/loopSlider/tacx.svg'; 
import sram from '../../assets/images/main/loopSlider/sram.svg'; 

import './style.scss';

export const MainPage = () => {
    return (
        <div className='mainPage'>
            <div className='mainPage__welcomeDiv'>
                <h1 className='mainPage__welcomeDiv__header'>ЭЛЕКТРО<br/>ВЕЛОСИПЕДЫ</h1>
                <p className='mainPage__welcomeDiv__text'>Cento10 Hybrid — это гоночный велосипед c помогающим<br/>педалированию электроприводом, который устанавливает новый,<br/>очень высокий стандарт для данной категории</p>
                <DiffLink to={'/catalog/bicycle'} orTo={'/auth'} className='mainPage__welcomeDiv__link'>Подробнее</DiffLink>
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
        </div>
    );
};