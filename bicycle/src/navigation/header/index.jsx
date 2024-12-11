import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext, AdminContext } from '../../App';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { AuthModalWindow } from '../../components/ModalWindow/AuthModalWindow';
import { RegisterModalWindow } from '../../components/ModalWindow/RegisterModalWindow';

import icon from '../../assets/icons/icon.svg';
import cart from '../../assets/icons/header/cart.svg';
import burgerMenu from '../../assets/icons/header/rightMenu.svg';

import './style.scss';

export const Header = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { isAdmin, setIsAdmin } = useContext(AdminContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [authIsOpen, setAuthIsOpen] = useState(false);
    const [registerIsOpen, setRegisterIsOpen] = useState(false);

    const navigate = useNavigate();
  
    const logout = () => {
        navigate("/");
        localStorage.removeItem("token");
        setIsAuth(false);
        setIsAdmin(false);
    };

    const openAuthModal = () => {
        setModalIsOpen(false);
        setAuthIsOpen(true);
    };

    return (
        <header className='header'>
            <Link className='header__link'> <img src={icon} alt="logo" /> </Link>
            <div className='header__wrapper'>
                {isAdmin && (<Link to={'/admin'} className='header__button link_orange secondAdaptive'>Админ</Link>)}
                <Link to={'/bicycle'} className='header__link adaptive'>ВЕЛОСИПЕДЫ</Link>
                {!isAuth && (<button className='header__link secondAdaptive' onClick={()=>{setAuthIsOpen(true)}}>ВОЙТИ</button>)}
                {!isAuth && (<button className='header__link link_orange secondAdaptive' onClick={()=>{setRegisterIsOpen(true)}}>РЕГИСТРАЦИЯ</button>)}
                {isAuth && (<Link to={'/cart'} className='header__button secondAdaptive'> <img src={cart} alt="cart" /> </Link>)}
                {isAuth && (<button className='header__link link_orange secondAdaptive' onClick={logout}>ВЫЙТИ</button>)}
                <button className='header__burgerMenuButton' onClick={() => {setModalIsOpen(true)}}><img src={burgerMenu} alt="burgerMenu" /></button>
            </div>
            <ModalWindow isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <div className='header__burgerMenuWrapper'>
                <p className='header__burgerMenuWrapper__header'>МЕНЮ</p>
                    {isAdmin && (<Link to={'/admin'} className='header__button link_orange'>Админ</Link>)}
                    <Link to={'/bicycle'} className='header__burgerMenuWrapper__link'>ВЕЛОСИПЕДЫ</Link>
                    {!isAuth && (<button className='header__burgerMenuWrapper__link' onClick={()=>{setAuthIsOpen(true); setModalIsOpen(false)}}>ВОЙТИ</button>)}
                    {!isAuth && (<button className='header__burgerMenuWrapper__link link_orange' onClick={()=>{setRegisterIsOpen(true); setModalIsOpen(false)}}>РЕГИСТРАЦИЯ</button>)}
                    {isAuth && (<Link to={'/cart'} className='header__burgerMenuWrapper__link'>КОРЗИНА</Link>)}
                    {isAuth && (<button className='header__burgerMenuWrapper__link' onClick={logout}>ВЫЙТИ</button>)}
                </div>
            </ModalWindow>
            <RegisterModalWindow isOpen={registerIsOpen} onClose={() => {setRegisterIsOpen(false)}} />
            <AuthModalWindow isOpen={authIsOpen} onClose={() => {setAuthIsOpen(false)}} />
        </header>
    );
};