import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'

import icon from '../../assets/icons/icon.svg'
import search from '../../assets/icons/header/search.svg'
import user from '../../assets/icons/header/user.svg'
import favorites from '../../assets/icons/header/favorites.svg'
import cart from '../../assets/icons/header/cart.svg'
import rightMenu from '../../assets/icons/header/rightMenu.svg'

import './style.scss'

export const Header = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);

    const navigate = useNavigate();
  
    const logout = () => {
        navigate("/");
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    return (
        <header className='header'>
            <Link className='header__link'> <img src={icon} alt="logo" /> </Link>
            <div className='header__wrapper'>
                {isAuth && (<Link to={'/tradeIn'} className='header__link link_orange'>TRADE IN</Link>)}
                {isAuth && (<Link to={'/bicycle'} className='header__link'>ВЕЛОСИПЕДЫ</Link>)}
                {isAuth && (<Link to={'/'} className='header__link'>ЗАПЧАСТИ</Link>)}
                {isAuth && (<Link to={'/'} className='header__link'>АКСЕССУАРЫ</Link>)}
                {isAuth && (<Link to={'/'} className='header__link'>ВЕЛОСТАНКИ</Link>)}
                {isAuth && (<button className='header__button search_img'> <img src={search} alt="searchImg" /> </button>)}
                {!isAuth && (<Link to={'/auth'} className='header__link'> <img src={user} alt="user" /> </Link>)}
                {isAuth && (<Link to={'/'} className='header__button'> <img src={favorites} alt="favorites" /> </Link>)}
                {isAuth && (<Link to={'/'} className='header__button'> <img src={cart} alt="cart" /> </Link>)}
                {!isAuth && (<Link to={'/'} className='header__button'> <img src={rightMenu} alt="rightMenu" /> </Link>)}
                {isAuth && (<button className='quitButton' onClick={logout}>quit</button>)}
            </div>
        </header>
    );
};

