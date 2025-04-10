import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Card } from '../../../components/card';
import { SwitchButton } from '../../../components/Buttons/switch';
import { CheckboxButton } from '../../../components/Buttons/checkbox';
import { Preloader } from '../../../components/preloader';

import { useRequest } from '../../../helpers/hooks/useRequest';

import './style.scss';

export const CatalogPage = () => {
    const { register, handleSubmit } = useForm();

    const { category } = useParams();
    const [currentItems, setCurrentItems] = useState([]);
    const [currentPage, setCurrentPage] = useState('');
    const [categoriesButtonChecked, setCategoriesButtonChecked] = useState(false);
    const [brandsButtonChecked, setBrandsButtonChecked] = useState(false);
    const [colorsButtonChecked, setColorsButtonChecked] = useState(false);
    const [filterPatterns, setFilterPatterns] = useState({
        inStock: false,
        category: [],
        brand: [],
        color: []
    });

    const changeFilter = (field, data, isChecked) => {
        setFilterPatterns((prev) => {
            let newFieldData = prev[field];
            if (isChecked) { newFieldData.push(data); }
            else { newFieldData = newFieldData.filter(val => val !== data); }
            return { ...prev, [field]: newFieldData };
        });
    }

    const resetFilter = (data) => { console.log("поля не сбрасываются"); }

    const { currentData, currentIsLoading, currentError } = useRequest(`${category}/amount`, {
        data: 'currentData',
        loading: 'currentError',
        error: 'currentIsLoading'
    });
    const { menuInfo, menuInfoLoading, menuInfoErr } = useRequest(`${category}/catalog-menu`, {
        data: 'menuInfo',
        loading: 'menuInfoLoading',
        error: 'menuInfoErr'
    });

    useEffect(() => {
        const firstFiltration = currentData.filter((val) => {
            if (filterPatterns.brand.length !== 0 && filterPatterns.category.length !== 0) {
                if (filterPatterns.brand.includes(val.brand) && filterPatterns.category.includes(val.type)) { return val; }
            } else if (filterPatterns.brand.length !== 0 && filterPatterns.category.length === 0) {
                if (filterPatterns.brand.includes(val.brand)) { return (val); }
            } else if (filterPatterns.brand.length === 0 && filterPatterns.category.length !== 0) {
                if (filterPatterns.category.includes(val.type)) { return val; }
            } else { return val; }
        });

        const secondFiltration = firstFiltration.filter((val) => {
            if (filterPatterns.inStock && val.amount > 0) { return val; }
            else if (!filterPatterns.inStock) { return val; }
        });

        setCurrentItems(secondFiltration);
    }, [filterPatterns]);

    useEffect(() => { setCurrentItems(currentData) }, [currentData]);

    useEffect(() => {
        switch (category) {
            case 'bicycles': 
                setCurrentPage('Велосипеды');
                break;
            case 'parts':
                setCurrentPage('Запчасти');
                break;
            case 'equipments':
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
            <div className='catalogPage__body' style={(currentIsLoading || menuInfoLoading) ? {justifyContent: 'center'} : {justifyContent: 'space-between'}}>
                <Preloader isLoading={currentIsLoading || menuInfoLoading}>
                    <form className='catalogPage__body__options' onSubmit={handleSubmit(resetFilter)}>
                        <div className='catalogPage__body__options__stock'>
                            <label className='catalogPage__body__options__stock-header' htmlFor='inStock'>Только в наличии</label>
                            <SwitchButton name={'inStock'} formFunction={register} onChange={(event) => { setFilterPatterns((prev) => { return {...prev, inStock: event.target.checked} }); }}/>
                        </div>
                        <hr className='catalogPage__body__options-separator'/>
                        <div className='catalogPage__body__options__categories'>
                            <div className='catalogPage__body__options__categories__header'>
                                <label className='catalogPage__body__options__categories__header-header' htmlFor='categories'>Категории</label>
                                <input type="checkbox" id="categories" className='catalogPage__body__options__categories__header-input' onChange={(event) => { setCategoriesButtonChecked(event.target.checked); }}/>
                                <label htmlFor='categories' className='catalogPage__body__options__categories__header-button'>
                                    <div></div>
                                    <div></div>
                                </label>
                            </div>
                            <div className='catalogPage__body__options__categories__body' style={{height: categoriesButtonChecked ? `${30*menuInfo?.categories?.length}px` : '0px'}}>
                                {menuInfo?.categories?.map((data, index) => {
                                    return (
                                        <div className='catalogPage__body__options__categories__body__item' key={index}>
                                            <div className='catalogPage__body__options__colors__body__item-wrapper'>
                                                <CheckboxButton name={data.field} formFunction={register} onChange={(event) => { changeFilter('category', data.field, event.target.checked) }}/>
                                                <label className='catalogPage__body__options__categories__body__item-wrapper-text' htmlFor={data.field}>{data.field}</label>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <hr className='catalogPage__body__options-separator'/>
                        <div className='catalogPage__body__options__brands'>
                            <div className='catalogPage__body__options__brands__header'>
                                <label className='catalogPage__body__options__brands__header-header' htmlFor='brands'>Производители</label>
                                <input type="checkbox" id="brands" className='catalogPage__body__options__brands__header-input' onChange={(event) => { setBrandsButtonChecked(event.target.checked); }}/>
                                <label htmlFor='brands' className='catalogPage__body__options__brands__header-button'>
                                    <div></div>
                                    <div></div>
                                </label>
                            </div>
                            <div className='catalogPage__body__options__brands__body' style={{height: brandsButtonChecked ? `${30*menuInfo?.brands?.length}px` : '0px'}}>
                                {menuInfo?.brands?.map((data, index) => {
                                    return (
                                        <div className='catalogPage__body__options__brands__body__item' key={index}>
                                            <div className='catalogPage__body__options__brands__body__item-wrapper'>
                                                <CheckboxButton name={`${data.field}`} formFunction={register} onChange={(event) => { changeFilter('brand', data.field, event.target.checked) }}/>
                                                <label className='catalogPage__body__options__brands__body__item-wrapper-text' htmlFor={`${data.field}`}>{data.field}</label>
                                            </div>
                                            <label className='catalogPage__body__options__brands__body__item-amount' htmlFor={`${data.field}`}>({data.summ})</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </form>
                    <div className='catalogPage__body__items'>
                        {currentItems.map((data, index) => {
                            return (
                                <div className='catalogPage__body__items__item' key={index}>
                                    <Card
                                        id = {data._id}
                                        itemName = {`${data.brand} ${data.model}`}
                                        itemCountry = {data.countryImage}
                                        itemAmount = {data.amount}
                                        itemImage = {data.productImage}
                                        itemPrice = {data.price}
                                        discount = {data.discount}
                                        linkTo = {`/catalog/bicycles/${data._id}`}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </Preloader>
            </div>
        </div>
    );
}