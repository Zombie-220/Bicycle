import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { API_URL } from '../../../requests/request';

import './style.scss';

export const CatalogById = () => {
    const [currentCategory, setCurrentCategory] = useState('');
    const [currentItemData, setCurrentItemData] = useState({});
    const { category, id } = useParams();

    useEffect(() => {
        switch (category) {
            case 'bicycles':
                setCurrentCategory('Велосипеды');
                API_URL(`/bicycles/${id}`).then(({ data }) => {
                    setCurrentItemData(data);
                }).catch((err) => { console.log(err); })
        }
    }, [category, id]);

    return (
        <div className="catalogById">
            <div className='catalogById__link'>
                <div className='catalogById__link'>
                    <Link className='catalogById__link-link' to={'/'}>Главная</Link>
                    <p className='catalogById__link-separator'>/</p>
                    <Link className='catalogById__link-link' to={'/catalog/bicycles'}>{currentCategory}</Link>
                    <p className='catalogById__link-separator'>/</p>
                    <Link className='catalogById__link-link-orange'>{currentItemData.brand} {currentItemData.model}</Link>
                </div>
            </div>
            <div className='catalogById__body'>
                
            </div>
        </div>
    );
}