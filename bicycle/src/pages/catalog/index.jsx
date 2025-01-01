import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './style.scss';

export const CatalogPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState('');

    useEffect(() => {
        setProducts([]);
        switch (category) {
            case 'bicycle': 
                setCurrentPage('Велосипеды');
                break;
            case 'parts':
                setCurrentPage('Запчасти');
                break;
            case 'equipment':
                setCurrentPage('Экипировка');
                break;
            case 'accessories':
                setCurrentPage('Аксессуары');
                break;
        }
    }, [category])

    return (
        <div className='catalogPage'>
            <div className='catalogPage__header'>
                <p className='catalogPage__header-link'>
                    <Link to={'/'} className='catalogPage__header-link-link'>Главная</Link>
                    <span className='catalogPage__header-link-separator'>/</span>
                    <Link className='catalogPage__header-link-link-orange'>{currentPage}</Link>
                </p>
                <p className='catalogPage__header-header'>{currentPage.toUpperCase()}</p>
            </div>
            <div className='catalogPage__body'>
                <div className='catalogPage__body__options'>

                </div>
                <div className='catalogPage__body__items'>

                </div>
            </div>
        </div>
    );
}