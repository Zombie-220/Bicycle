import React from 'react';
import { Link } from 'react-router-dom';

import { DiffLink } from '../../components/DiffLink';
import { DivSlider } from '../../components/Sliders/divSlider';

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
        </div>
    );
};