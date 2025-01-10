import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { API_URL } from '../../requests/request';
import { Decrypt } from '../../helpers/AES';

import { Card } from '../../components/card';
import { SwitchButton } from '../../components/Buttons/switch';
import { CheckboxButton } from '../../components/Buttons/checkbox';

import './style.scss';

export const CatalogPage = () => {
    const { register, handleSubmit } = useForm();

    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState('');

    const [categoriesButtonChecked, setCategoriesButtonChecked] = useState(false);
    const handleCategoriesButtonChanges = (event) => { setCategoriesButtonChecked(event.target.checked); }

    const onSubmit = (data) => {
        console.log(data);
    }

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



                <form className='catalogPage__body__options' onSubmit={handleSubmit(onSubmit)}>
                    <div className='catalogPage__body__options__stock'>
                        <p className='catalogPage__body__options__stock-header'>Только в наличии</p>
                        <SwitchButton name={'inStock'} formFunction={register} />
                    </div>
                    <hr  className='catalogPage__body__options-separator'/>
                    <div className='catalogPage__body__options__categories'>
                        <div className='catalogPage__body__options__categories__header'>
                            <p className='catalogPage__body__options__categories__header-header'>Категории</p>
                            <input type="checkbox" id="categories" className='catalogPage__body__options__categories__header-input' onChange={handleCategoriesButtonChanges}/>
                            <label htmlFor='categories' className='catalogPage__body__options__categories__header-button'>
                                <div></div>
                                <div></div>
                            </label>
                        </div>
                        <div className='catalogPage__body__options__categories__body' style={{height: categoriesButtonChecked ? '100px' : '0px'}}>
                            <div className='catalogPage__body__options__categories__body__item'>
                                <CheckboxButton name={'categorie-1'} formFunction={register}/>
                                <label className='catalogPage__body__options__categories__body__item-text' htmlFor={`categorie-1`}>Lorem, ipsum.1</label>
                            </div>
                            <div className='catalogPage__body__options__categories__body__item'>
                                <CheckboxButton name={'categorie-2'} formFunction={register}/>
                                <label className='catalogPage__body__options__categories__body__item-text' htmlFor={`categorie-2`}>Lorem, ipsum.2</label>
                            </div>
                            <div className='catalogPage__body__options__categories__body__item'>
                                <CheckboxButton name={'categorie-3'} formFunction={register}/>
                                <label className='catalogPage__body__options__categories__body__item-text' htmlFor={`categorie-3`}>Lorem, ipsum.3</label>
                            </div>
                        </div>
                    </div>
                    <button>xx</button>
                </form>



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