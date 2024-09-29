import React from 'react'
import { Link } from 'react-router-dom';

import './style.scss'
import '../../assets/fonts/fonts.css'

export const Main = () => {
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
        </div>
    );
};