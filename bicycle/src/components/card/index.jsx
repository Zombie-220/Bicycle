import { DiffLink } from '../DiffLink';

import click from './click.svg'; 
import './style.scss';

/**
 * Карточка товара, распологается в основном в каталоге
 * @param {Object} props props
 * @param {string | number} props.id id товара
 * @param {string} props.itemName название товара
 * @param {string | null} props.itemCountry страна-производитель товара
 * @param {number} props.itemAmount количество товара
 * @param {string} props.itemImage картинка товара
 * @param {number} props.itemPrice цена товара
 * @param {string} props.linkTo ссылка, куда ведет карточка
 * @param {number} props.discount скидка на товар
 * @returns {React.JSX.Element}
*/
export const Card = (props) => {
    const {
        id,
        itemName,
        itemCountry=null,
        itemAmount,
        itemImage,
        itemPrice,
        linkTo,
        discount
    } = props;

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
                {discount <= 0 ?
                    <p className='card__body-price'>
                        {itemPrice.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽
                    </p>
                    :
                    <div className='card__body__priceContainer'>
                        <p className='card__body__priceContainer-discount'>
                            {(itemPrice - itemPrice * discount / 100).toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽
                        </p>
                        <p className='card__body__priceContainer-price'>{itemPrice.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
                    </div>
                }
            </div>
            <div className='card__footer'>
                <DiffLink to={linkTo} className='card__footer-button'>
                    <img className='card__footer-button-img' src={click} alt="click" />
                    <p className='card__footer-button-text'>В 1 клик</p>
                </DiffLink>
            </div>
        </div>
    );
}