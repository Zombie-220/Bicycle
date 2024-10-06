import { Link } from 'react-router-dom'

import icon from '../../assets/icons/icon.svg'
import search from '../../assets/icons/header/search.svg'
import user from '../../assets/icons/header/user.svg'
import favorites from '../../assets/icons/header/favorites.svg'
import cart from '../../assets/icons/header/cart.svg'
import rightMenu from '../../assets/icons/header/rightMenu.svg'

import './style.scss'

export const Header = () => {
    return (
        <header className='header'>
            <Link className='header__link'> <img src={icon} alt="logo" /> </Link>
            <div className='header__wrapper'>
                <Link to={'/tradeIn'} className='header__link link_orange'>TRADE IN</Link>
                <Link to={'/bicycle'} className='header__link'>ВЕЛОСИПЕДЫ</Link>
                <Link to={'/'} className='header__link'>ЗАПЧАСТИ</Link>
                <Link to={'/'} className='header__link'>АКСЕCСУАРЫ</Link>
                <Link to={'/'} className='header__link'>ВЕЛОСТАНКИ</Link>
                <button className='header__button search_img'> <img src={search} alt="searchImg" /> </button>
                <Link to={'/auth'} className='header__link'> <img src={user} alt="user" /> </Link>
                <Link to={'/'} className='header__button'> <img src={favorites} alt="favorites" /> </Link>
                <Link to={'/'} className='header__button'> <img src={cart} alt="cart" /> </Link>
                <Link to={'/'} className='header__button'> <img src={rightMenu} alt="rightMenu" /> </Link>
            </div>
        </header>
    );
};