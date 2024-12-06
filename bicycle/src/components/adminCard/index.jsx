import { useNavigate } from 'react-router-dom';
import { useCallback, useContext } from 'react';

import { ChangeProductContext } from '../../App';

import './style.scss';

export const AdminCard = ({ id, name, image, cost, amount, onRemove }) => {
    const { changedProduct, setChangedProduct } = useContext(ChangeProductContext);
    const navigate = useNavigate();

    function changeProduct() {
        setChangedProduct(id);
        navigate('/changePage');
    }

    const removeProduct = useCallback(() => {
        onRemove(id);
    }, [id, onRemove]);

    return (
        <div className="adminCard">
            <div className='adminCard__imageContainer'>
                <img src={image} alt="adminCardImage" className='adminCard__imageContainer-image' />
            </div>
            <div className='adminCard__textContainer'>
                <p className='adminCard__textContainer-header'>{name}</p>
                <div className='adminCard__textContainer__textContainer'>
                    <p className='adminCard__textContainer__textContainer-amount'>
                        Количество: <span className='adminCard__textContainer__textContainer-amount-bold'>{amount} шт.</span>
                    </p>
                    <p className='adminCard__textContainer__textContainer-cost'>
                        Стоимость: <span className='adminCard__textContainer__textContainer-cost-bold'>{cost.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</span>
                    </p>
                </div>
                <div className='adminCard__textContainer__buttonContainer'>
                    <button onClick={changeProduct} className='adminCard__textContainer__buttonContainer-link'>Редактировать</button>
                    <button onClick={removeProduct} className='adminCard__textContainer__buttonContainer-button'>Удалить</button>
                </div>
            </div>
        </div>
    );
}