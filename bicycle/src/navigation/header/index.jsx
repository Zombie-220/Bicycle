import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { AuthContext, AdminContext } from '../../App';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { RegisterModalWindow } from '../../components/ModalWindow/RegisterModalWindow';

import icon from '../../assets/icons/icon.svg';
import cart from '../../assets/icons/header/cart.svg';
import burgerMenu from '../../assets/icons/header/rightMenu.svg';

import './style.scss';

export const Header = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { isAdmin, setIsAdmin } = useContext(AdminContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [registerIsOpen, setRegisterIsOpen] = useState(false);
    const [background, setBackground] = useState("#0000");

    const navigate = useNavigate();
    const location = useLocation();
  
    const logout = () => {
        navigate("/");
        localStorage.removeItem("token");
        setIsAuth('');
        setIsAdmin(false);
    };

    useEffect(() => {
        if (location.pathname !== '/') { setBackground('#101010'); }
        else { setBackground('#0000'); }
    }, [location]);

    return (
        <header className='header' style={{background: background}}>
            <Link className='header__link'> <img src={icon} alt="logo" /> </Link>
            <div className='header__wrapper'>
                {isAdmin && (<Link to={'/admin/bicycle'} className='header__button link_orange secondAdaptive'>Админ</Link>)}
                <Link to={'/bicycle'} className='header__link adaptive'>ВЕЛОСИПЕДЫ</Link>
                {isAuth === '' && (<Link to={'/auth'} className='header__link secondAdaptive'>ВОЙТИ</Link>)}
                {isAuth === '' && (<button className='header__link link_orange secondAdaptive' onClick={()=>{setRegisterIsOpen(true)}}>РЕГИСТРАЦИЯ</button>)}
                {isAuth !== '' && (<Link to={'/cart'} className='header__button secondAdaptive'> <img src={cart} alt="cart" /> </Link>)}
                {isAuth !== '' && (<button className='header__link link_orange secondAdaptive' onClick={logout}>ВЫЙТИ</button>)}
                <button className='header__burgerMenuButton' onClick={() => {setModalIsOpen(true)}}><img src={burgerMenu} alt="burgerMenu" /></button>
            </div>
            <ModalWindow isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <div className='header__burgerMenuWrapper'>
                <p className='header__burgerMenuWrapper__header'>МЕНЮ</p>
                    {isAdmin && (<Link to={'/admin/bicycle'} className='header__button link_orange'>Админ</Link>)}
                    <Link to={'/bicycle'} className='header__burgerMenuWrapper__link'>ВЕЛОСИПЕДЫ</Link>
                    {isAuth === '' && (<Link to={'/auth'} className='header__link secondAdaptive'>ВОЙТИ</Link>)}
                    {isAuth === '' && (<button className='header__burgerMenuWrapper__link link_orange' onClick={()=>{setRegisterIsOpen(true); setModalIsOpen(false)}}>РЕГИСТРАЦИЯ</button>)}
                    {isAuth !== '' && (<Link to={'/cart'} className='header__burgerMenuWrapper__link'>КОРЗИНА</Link>)}
                    {isAuth !== '' && (<button className='header__burgerMenuWrapper__link' onClick={logout}>ВЫЙТИ</button>)}
                </div>
            </ModalWindow>
            <RegisterModalWindow isOpen={registerIsOpen} onClose={() => {setRegisterIsOpen(false)}} />
        </header>
    );
};