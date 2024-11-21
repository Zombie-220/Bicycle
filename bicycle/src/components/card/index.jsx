import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';

import './style.scss';
import clickIcon from './icon/click.svg';

import bicycle from './temp_bicycle.png';
import country from './temp_country.png';

export const Card = ({bicycleIMG, countryIMG, name, price, status, id, onEdit, onRemove}) => {
    const [cardStatusColor, setCardStatusColor] = useState('card__status__red');

    const removeProduct = useCallback(() => {
        onRemove(id);
    }, [id, onRemove]);
    
    const editProduct = useCallback(() => {
        onEdit({ status: true, id });
    }, [id, onEdit]);

    useEffect(() => {
        if ( status === 'В наличии' ) { setCardStatusColor('card__status__green'); }
    })

    return (
        <div className="card">
            <div className='card__relativeDiv'>
                <img src={country} alt="countryIMG" className='card__relativeDiv__country'/>
                <p className={`card__relativeDiv__status ${cardStatusColor}`}>{status}</p>
            </div>
            <div className='card__wrapper'>
                <img src={bicycle} alt="bicycleIMG" className="card__wrapper__image"/>
                <p className="card__wrapper__name">{name}</p>
                <p className="card__wrapper__price">{price} ₽</p>
            </div>
            <Link className='card__link'>
                <img src={clickIcon} alt={clickIcon} className='card__link__img'/>
                <p className='card__link__text'>В 1 клик</p>
            </Link>
            {/* <div className='test'>
                <button onClick={removeProduct}>Удалить</button>
                <button onClick={editProduct}>Изменить</button>
            </div> */}
        </div>
    )
}