import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export const CartPage = () => {
    return (
        <div className='cartPage'>
            <p className='cartPage__links'>
                <Link to='/' className='cartPage__links-link'>Главная</Link>
                <span>/</span>
                <Link to='/cart' className='cartPage__links-link'>Корзина</Link>
            </p>
            <div className='cartPage__body'>
                <h1 className='cartPage__body-header'>Корзина</h1>
                <div className='cartPage__body__items'>
                    
                </div>
            </div>
        </div>
    );
}