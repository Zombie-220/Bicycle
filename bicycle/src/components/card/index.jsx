import { DiffLink } from '../DiffLink';

import click from './click.svg'; 
import './style.scss';

export const Card = (props) => {
    const { id, itemName, itemCountry=null, itemAmount, itemImage, itemPrice } = props;

    return (
        <div className='card'>
            <div className='card__header'>
                {itemCountry ? <img className='card__header-img' src={itemCountry} alt="country" /> : <div></div>}
                <p className={`card__header-amount-${itemAmount === 0 ? 'red' : 'green'}`}>
                    {itemAmount === 0 ? 'Распродано' : 'В наличии'}
                </p>
            </div>
            <div className='card__body'>
                <div className='card__body__imgContainer'>
                    <img className='card__body__imgContainer-img' src={itemImage} alt="itemImage" />
                </div>
                <p className='card__body-name'>{itemName}</p>
                <p className='card__body-price'>
                    {itemPrice.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽
                </p>
            </div>
            <div className='card__footer'>
                <DiffLink to={`/products/bicycle/${id}`} className='card__footer-button'>
                    <img className='card__footer-button-img' src={click} alt="click" />
                    <p className='card__footer-button-text'>В 1 клик</p>
                </DiffLink>
            </div>
        </div>
    );
}