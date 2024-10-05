import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import clickIcon from './icon/click.svg';

export const Card = ({imageIMG, countryIMG, name, price, status}) => {
    const [cardStatusColor, setCardStatusColor] = useState('card__status__red');
    const [show, setShow] = useState(false);

    useEffect(() => {
        if ( status === 'В наличии' ) { setCardStatusColor('card__status__green'); }
    })

    return (
        <div className="card">
            <div className='card__relativeDiv'>
                <img src={countryIMG} alt={countryIMG} className='card__relativeDiv__country'/>
                <p className={`card__relativeDiv__status ${cardStatusColor}`}>{status}</p>
            </div>
            <div className='card__wrapper'>
                <img src={imageIMG} alt={countryIMG} className="card__wrapper__image"/>
                <p className="card__wrapper__name">{name}</p>
                <p className="card__wrapper__price">{price} ₽</p>
            </div>

            <Link className='card__link'>
                <img src={clickIcon} alt={clickIcon} className='card__link__img'/>
                <p className='card__link__text'>В 1 клик</p>
            </Link>
        </div>
    )
}