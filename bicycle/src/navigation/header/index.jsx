import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { ModalWindow } from '../../components/ModalWindow1/ModalWindow';
import { AuthModalWindow } from '../../components/ModalWindow1/AuthModalWindow';

import icon from '../../assets/icons/icon.svg';
import user from '../../assets/icons/header/user.svg';
import favorites from '../../assets/icons/header/favorites.svg';
import cart from '../../assets/icons/header/cart.svg';
import burgerMenu from '../../assets/icons/header/rightMenu.svg';

import './style.scss';

export const Header = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [authIsOpen, setAuthIsOpen] = useState(false);

    const navigate = useNavigate();
  
    const logout = () => {
        navigate("/");
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    const openAuthModal = () => {
        setModalIsOpen(false);
        setAuthIsOpen(true);
    };

    return (
        <header className='header'>
            <Link className='header__link'> <img src={icon} alt="logo" /> </Link>
            <div className='header__wrapper'>
                <Link to={'/bicycle'} className='header__link adaptive'>ВЕЛОСИПЕДЫ</Link>
                <Link to={'/parts'} className='header__link adaptive'>ЗАПЧАСТИ</Link>
                <Link to={'/equipment'} className='header__link adaptive'>ЭКИПИРОВКА</Link>
                <Link to={'/accessories'} className='header__link adaptive'>АКСЕССУАРЫ</Link>
                <Link to={'/bikeRacks'} className='header__link adaptive'>ВЕЛОСТАНКИ</Link>
                {!isAuth && (<Link to={'/auth'} className='header__link secondAdaptive'>ВОЙТИ</Link>)}
                {!isAuth && (<Link to={'/register'} className='header__link link_orange secondAdaptive'>РЕГИСТРАЦИЯ</Link>)}
                {isAuth && (<Link to={'/user'} className='header__link'> <img src={user} alt="user" /> </Link>)}
                {isAuth && (<Link to={'/favorites'} className='header__button'> <img src={favorites} alt="favorites" /> </Link>)}
                {isAuth && (<Link to={'/cart'} className='header__button'> <img src={cart} alt="cart" /> </Link>)}
                {isAuth && (<button className='header__link link_orange' onClick={logout}>ВЫЙТИ</button>)}
                <button className='header__burgerMenuButton' onClick={() => {setModalIsOpen(true)}}><img src={burgerMenu} alt="burgerMenu" /></button>
            </div>
            <ModalWindow isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <div className='burgerMenuWrapper'>
                    <p className='header__authHeader'>МЕНЮ</p>
                    <Link to={'/bicycle'} className='header__link link_black'>ВЕЛОСИПЕДЫ</Link>
                    <Link to={'/parts'} className='header__link link_black'>ЗАПЧАСТИ</Link>
                    <Link to={'/equipment'} className='header__link link_black'>ЭКИПИРОВКА</Link>
                    <Link to={'/accessories'} className='header__link link_black'>АКСЕССУАРЫ</Link>
                    <Link to={'/bikeRacks'} className='header__link link_black'>ВЕЛОСТАНКИ</Link>
                    {!isAuth && (<button className='header__link link_black' onClick={openAuthModal}>ВОЙТИ</button>)}
                    {!isAuth && (<Link to={'/register'} className='header__link link_orange'>РЕГИСТРАЦИЯ</Link>)}
                    {isAuth && (<Link to={'/user'} className='header__link'> <img src={user} alt="user" /> </Link>)}
                    {isAuth && (<Link to={'/favorites'} className='header__button'> <img src={favorites} alt="favorites" /> </Link>)}
                    {isAuth && (<Link to={'/cart'} className='header__button'> <img src={cart} alt="cart" /> </Link>)}
                    {isAuth && (<button className='header__link link_orange' onClick={logout}>ВЫЙТИ</button>)}
                </div>
            </ModalWindow>
            <AuthModalWindow isOpen={authIsOpen} onClose={setAuthIsOpen} />
        </header>
    );
};