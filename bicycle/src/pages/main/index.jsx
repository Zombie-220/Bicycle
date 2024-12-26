import React from 'react';

import { DiffLink } from '../../components/DiffLink';

import './style.scss';

export const MainPage = () => {
    return (
        <div className='main'>
            <div className='main__welcomeDiv'>
                <h1 className='main__welcomeDiv__header'>ЭЛЕКТРО<br/>ВЕЛОСИПЕДЫ</h1>
                <p className='main__welcomeDiv__text'>Cento10 Hybrid — это гоночный велосипед c помогающим<br/>педалированию электроприводом, который устанавливает новый,<br/>очень высокий стандарт для данной категории</p>
                <DiffLink to={'/catalog/bicycle'} orTo={'/auth'} className='main__welcomeDiv__link'>Подробнее</DiffLink>
            </div>
        </div>
    );
};