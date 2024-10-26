import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { ModalWindow } from '../../components/ModalWindow1/ModalWindow';
import { AuthModalWindow } from '../../components/ModalWindow1/AuthModalWindow';
import { RegisterModalWindow } from '../../components/ModalWindow1/RegisterModalWindow';

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
    const [registerIsOpen, setRegisterIsOpen] = useState(false);

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
                {!isAuth && (<button className='header__link secondAdaptive' onClick={()=>{setAuthIsOpen(true)}}>ВОЙТИ</button>)}
                {!isAuth && (<button className='header__link link_orange secondAdaptive' onClick={()=>{setRegisterIsOpen(true)}}>РЕГИСТРАЦИЯ</button>)}
                {isAuth && (<Link to={'/user'} className='header__link'> <img src={user} alt="user" /> </Link>)}
                {isAuth && (<Link to={'/favorites'} className='header__button'> <img src={favorites} alt="favorites" /> </Link>)}
                {isAuth && (<Link to={'/cart'} className='header__button'> <img src={cart} alt="cart" /> </Link>)}
                {isAuth && (<button className='header__link link_orange' onClick={logout}>ВЫЙТИ</button>)}
                <button className='header__burgerMenuButton' onClick={() => {setModalIsOpen(true)}}><img src={burgerMenu} alt="burgerMenu" /></button>
            </div>
            <ModalWindow isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <div className='header__burgerMenuWrapper'>
                    <p className='header__burgerMenuWrapper__header'>МЕНЮ</p>
                    <Link to={'/bicycle'} className='header__burgerMenuWrapper__link'>ВЕЛОСИПЕДЫ</Link>
                    <Link to={'/parts'} className='header__burgerMenuWrapper__link'>ЗАПЧАСТИ</Link>
                    <Link to={'/equipment'} className='header__burgerMenuWrapper__link'>ЭКИПИРОВКА</Link>
                    <Link to={'/accessories'} className='header__burgerMenuWrapper__link'>АКСЕССУАРЫ</Link>
                    <Link to={'/bikeRacks'} className='header__burgerMenuWrapper__link'>ВЕЛОСТАНКИ</Link>
                    {!isAuth && (<button className='header__burgerMenuWrapper__link' onClick={()=>{setAuthIsOpen(true); setModalIsOpen(false)}}>ВОЙТИ</button>)}
                    {!isAuth && (<button className='header__burgerMenuWrapper__link link_orange' onClick={()=>{setRegisterIsOpen(true); setModalIsOpen(false)}}>РЕГИСТРАЦИЯ</button>)}
                    {isAuth && (<Link to={'/user'} className='header__burgerMenuWrapper__link'> <img src={user} alt="user" /> </Link>)}
                    {isAuth && (<Link to={'/favorites'} className='header__burgerMenuWrapper__link'> <img src={favorites} alt="favorites" /> </Link>)}
                    {isAuth && (<Link to={'/cart'} className='header__burgerMenuWrapper__link'> <img src={cart} alt="cart" /> </Link>)}
                    {isAuth && (<button className='header__burgerMenuWrapper__link' onClick={logout}>ВЫЙТИ</button>)}
                </div>
            </ModalWindow>
            <RegisterModalWindow isOpen={registerIsOpen} onClose={() => {setRegisterIsOpen(false)}} />
            <AuthModalWindow isOpen={authIsOpen} onClose={() => {setAuthIsOpen(false)}} />
        </header>
    );
};