import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { API_URL } from '../../requests/request';
import { Decrypt } from '../../helpers/AES';

import { Card } from '../../components/card';

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
                API_URL('/bicycles/amount/all').then(({ data }) => {
                    var decryptedData = [];
                    data.map((dataMap) => {
                        return (decryptedData.push({
                            _id: Decrypt(dataMap._id),
                            name: Decrypt(dataMap.name),
                            productImage: dataMap.productImage,
                            countryImage: dataMap.countryImage,
                            price: parseInt(Decrypt(dataMap.price)),
                            amount: parseInt(Decrypt(dataMap.amount)),
                            discount: parseInt(Decrypt(dataMap.discount))
                        }));
                    });
                    setProducts(decryptedData);
                }).catch((err) => { console.log(err); }) // удали к черту это убожество
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
                    <div className='catalogPage__body__options__stock'>
                        <p className='catalogPage__body__options__stock-header'>Только в наличии</p>
                        <label className="catalogPage__body__options__stock__container" htmlFor='inStockButton'>  
                            <input type="checkbox" id="inStockButton" className='catalogPage__body__options__stock__container-button' />
                            <label htmlFor="inStockButton" className='catalogPage__body__options__stock__container-label'></label>
                        </label>
                    </div>
                    <hr  className='catalogPage__body__options-separator'/>
                    <div className='catalogPage__body__options__categories'>
                        
                    </div>
                </div>
                <div className='catalogPage__body__items'>
                    {/* {products.map((data, index) => {
                        return (
                            <Card
                                key = {index}
                                id = {data._id}
                                itemName = {data.name}
                                itemCountry = {data.countryImage}
                                itemAmount = {data.amount}
                                itemImage = {data.productImage}
                                itemPrice = {data.price}
                            />
                        )
                    })} */}
                </div>
            </div>
        </div>
    );
}