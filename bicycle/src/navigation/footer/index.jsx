import { Link } from 'react-router-dom';

import './style.scss'
import logo from '../../assets/icons/icon.svg'
import phoneIcon from '../../assets/icons/footer/smartphone.svg'
import navigationIcon from '../../assets/icons/footer/navigation.svg'
import mailIcon from '../../assets/icons/footer/mail.svg'

export const Footer = () => {
    return (
        <div className='footer' style={{display: 'none'}}>
            <div className='footer__upSection'>
                <div className='footer__upSection__section footer__upSection__section__right'>
                    <img src={logo} alt={logo} className='footer__upSection__section__logo'/>
                    <p className='footer__upSection__section__text'>Компания World-bikes<br/>специализируется на продаже<br/>товаров для велосипедного спорта.</p>
                </div>
                <div className='footer__upSection__section'>
                    <h2  className='footer__upSection__section__header'>Каталог</h2>
                    <Link className='footer__upSection__section__link'>Trade-In</Link>
                    <Link className='footer__upSection__section__link footer__upSection__link__orange'>Велосипеды</Link>
                    <Link className='footer__upSection__section__link'>Экипировка</Link>
                    <Link className='footer__upSection__section__link'>Запчасти</Link>
                    <Link className='footer__upSection__section__link'>Велостнаки</Link>
                    <Link className='footer__upSection__section__link'>Аксесуары</Link>
                </div>
                <div className='footer__upSection__section'>
                    <h2 className='footer__upSection__section__header'>Для клиента</h2>
                    <Link className='footer__upSection__section__link'>О нас</Link>
                    <Link className='footer__upSection__section__link'>Доставка и оплата</Link>
                    <Link className='footer__upSection__section__link'>Блог</Link>
                    <Link className='footer__upSection__section__link'>Контакты</Link>
                    <Link className='footer__upSection__section__link'>Веломастерская</Link>
                    <Link className='footer__upSection__section__link'>Хранение</Link>
                    <Link className='footer__upSection__section__link'>Гарантии</Link>
                </div>
                <div className='footer__upSection__section'>
                    <h2 className='footer__upSection__section__header'>Контакты</h2>
                    <div className='footer__upSection__section__miniSection'>
                        <img src={phoneIcon} alt={phoneIcon} className='footer__upSection__section__miniSection__image'/>
                        <div className='footer__upSection__section__miniSection__textSection'>
                            <p>+7(495)055-75-86</p>
                            <p>+7(965)142-22-99</p>
                        </div>
                    </div>
                    <div className='footer__upSection__section__miniSection'>
                        <img src={navigationIcon} alt={navigationIcon} className='footer__upSection__section__miniSection__image'/>
                        <div className='footer__upSection__section__miniSection__textSection'>
                            <p>г. Москва, ул.<br/>Доватора, 7/8 с1</p>
                        </div>
                    </div>
                    <div className='footer__upSection__section__miniSection'>
                        <img src={mailIcon} alt={mailIcon} className='footer__upSection__section__miniSection__image'/>
                        <div className='footer__upSection__section__miniSection__textSection'>
                            <p>order@world-bike.ru</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer__downSection'>
                <p>© 2023 world bike</p>
                <p>Пользовательское соглашение</p>
            </div>
        </div>
    );
}