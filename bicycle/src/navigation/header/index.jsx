import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import { AuthContext, AdminContext } from '../../App';
import { DiffLink } from '../../components/DiffLink';

import icon from '../../assets/images/icon.svg';
import userIcon from '../../assets/images/header/user.svg';
import favoriteIcon from '../../assets/images/header/favorites.svg';
import cartIcon from '../../assets/images/header/cart.svg';

import './style.scss';

export const Header = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { isAdmin, setIsAdmin } = useContext(AdminContext);
    const [background, setBackground] = useState("#0000");

    const navigate = useNavigate();
    const location = useLocation();
  
    const logout = () => {
        // localStorage.clear();
        navigate("/");
        Cookies.remove("token");
        setIsAuth('');
        setIsAdmin(false);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (location.pathname !== '/') { setBackground('#101010'); }
        else { setBackground('#0000'); }
        Cookies.set('lastUsedPath', location.pathname, { expires: 7 });
    }, [location]);

    return (
        <header className='header' style={{background: background}}>
            <Link className='header__link'> <img src={icon} alt="logo" /> </Link>
            <div className='header__wrapper'>
                {isAdmin && (<Link to={'/admin/bicycle'} className='header__link link_orange'>АДМИН-ПАНЕЛЬ</Link>)}
                <Link to={'/catalog/bicycles?page=1'} className='header__link link_orange'>ВЕЛОСИПЕДЫ</Link>
                <Link to={'/catalog/parts'} className='header__link'>ЗАПЧАСТИ</Link>
                <Link to={'/catalog/equipments'} className='header__link'>ЭКИПИРОВКА</Link>
                <Link to={'/catalog/accessories'} className='header__link'>АКСЕССУАРЫ</Link>
                <DiffLink to={'/x'} className='header__link'><img src={userIcon} alt='userIcon' /></DiffLink>
                {isAuth !== '' && (<Link to={'/x'} className='header__link'> <img src={favoriteIcon} alt="favoriteIcon" /> </Link>)}
                {isAuth !== '' && (<Link to={'/cart'} className='header__link'> <img src={cartIcon} alt="cartIcon" /> </Link>)}
                {isAuth !== '' && (<button className='header__link link_orange' onClick={logout}>ВЫЙТИ</button>)}
            </div>
        </header>
    );
};