import { Link } from 'react-router-dom';

import './style.scss';
import clickIcon from './icon/click.svg';

export const Card = ({bicycleIMG, countryIMG, name, price, amount}) => {
    return (
        <div className="card">
            <div className='card__relativeDiv'>
                <img src={countryIMG} alt="countryIMG" className='card__relativeDiv__country'/>
                <p className={`card__relativeDiv__status ${amount > 0? 'card__status__green' : 'card__status__red'}`}>{amount > 0? 'В наличии' : 'Распродано'}</p>
            </div>
            <div className='card__wrapper'>
                <img src={bicycleIMG} alt="bicycleIMG" className="card__wrapper__image"/>
                <p className="card__wrapper__name">{name}</p>
                <p className="card__wrapper__price">{price.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
            </div>
            <Link className='card__link'>
                <img src={clickIcon} alt='clickIcon' className='card__link__img'/>
                <p className='card__link__text'>В 1 клик</p>
            </Link>
        </div>
    )
}