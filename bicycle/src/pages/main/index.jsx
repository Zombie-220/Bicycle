import React from 'react';

import { DiffLink } from '../../components/DiffLink';

import './style.scss';

export const MainPage = () => {
    return (
        <div className='mainPage'>
            <div className='mainPage__welcomeDiv'>
                <h1 className='mainPage__welcomeDiv__header'>ЭЛЕКТРО<br/>ВЕЛОСИПЕДЫ</h1>
                <p className='mainPage__welcomeDiv__text'>Cento10 Hybrid — это гоночный велосипед c помогающим<br/>педалированию электроприводом, который устанавливает новый,<br/>очень высокий стандарт для данной категории</p>
                <DiffLink to={'/catalog/bicycle'} orTo={'/auth'} className='mainPage__welcomeDiv__link'>Подробнее</DiffLink>
            </div>
        
        </div>
    );
};