import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './style.scss'
import '../../assets/fonts/fonts.css'

import { DivSlider } from '../../components/divSlider';

const Main = () => {
    return (
        <div className='main'>
            <div className='main__welcomeDiv'>
                <h1 className='main__welcomeDiv__header'>ЭЛЕКТРО<br/>ВЕЛОСИПЕДЫ</h1>
                <p className='main__welcomeDiv__text'>Cento10 Hybrid — это гоночный велосипед c помогающим<br/>педалированию электроприводом, который устанавливает новый,<br/>очень высокий стандарт для данной категории</p>
                <Link to='/bicycle' className='main__welcomeDiv__link'>Подробнее</Link>
            </div>
            <DivSlider/>
        </div>
    );
};

export default Main;