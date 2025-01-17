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
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);

    const [categoriesButtonChecked, setCategoriesButtonChecked] = useState(false);
    const handleCategoriesButtonChanges = (event) => { setCategoriesButtonChecked(event.target.checked); }
    const [brandsButtonChecked, setBrandsButtonChecked] = useState(false);
    const handleBrandsButtonChanges = (event) => { setBrandsButtonChecked(event.target.checked); }
    const [colorsButtonChecked, setColorsButtonChecked] = useState(false);
    const handleColorsButtonChanges = (event) => { setColorsButtonChecked(event.target.checked); }

    const [selectedItems, setSelectedItems] = useState([]);

    const handleChanges = (brand) => {
        setSelectedItems((prev) => 
            prev.includes(brand) ? prev.filter((cat) => cat !== brand) : [...prev, brand]
        )
    }

    const filteredItems = products.filter(item =>
        selectedItems.length === 0 ? true : selectedItems.includes(item.brand)
    );

    const onSubmit = (data) => {
        console.log(data);
    }

    useEffect(() => {
        setProducts([]);
        switch (category) {
            case 'bicycles': 
                setCurrentPage('Велосипеды');
                API_URL('/bicycles/amount/all').then(({ data }) => {
                    var decryptedData = [];
                    data.map((dataMap) => {
                        return (decryptedData.push({
                            _id: Decrypt(dataMap._id),
                            brand: Decrypt(dataMap.brand),
                            model: Decrypt(dataMap.model),
                            productImage: dataMap.productImage,
                            countryImage: dataMap.countryImage,
                            price: parseInt(Decrypt(dataMap.price)),
                            amount: parseInt(Decrypt(dataMap.amount)),
                            discount: parseInt(Decrypt(dataMap.discount))
                        }));
                    });
                    setProducts(decryptedData);
                }).catch((err) => { console.log(err); }) // удали к черту это убожество

                API_URL('/bicycles/orderBy?field=type&summ=amount').then(({ data }) => {
                    setCategories(data);
                }).catch((err) => { console.log(err); })

                API_URL('/bicycles/orderBy?field=brand&summ=amount').then(({ data }) => {
                    setBrands(data);
                }).catch((err) => { console.log(err); })

                API_URL('/bicycles/orderBy?field=color&summ=amount').then(({ data }) => {
                    setColors(data);                    
                }).catch((err) => { console.log(err); })
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
                        <label className='catalogPage__body__options__stock-header' htmlFor='inStock'>Только в наличии</label>
                        <SwitchButton name={'inStock'} formFunction={register} />
                    </div>
                    <hr  className='catalogPage__body__options-separator'/>
                    <div className='catalogPage__body__options__categories'>
                        <div className='catalogPage__body__options__categories__header'>
                            <label className='catalogPage__body__options__categories__header-header' htmlFor='categories'>Категории</label>
                            <input type="checkbox" id="categories" className='catalogPage__body__options__categories__header-input' onChange={handleCategoriesButtonChanges}/>
                            <label htmlFor='categories' className='catalogPage__body__options__categories__header-button'>
                                <div></div>
                                <div></div>
                            </label>
                        </div>
                        <div className='catalogPage__body__options__categories__body' style={{height: categoriesButtonChecked ? `${30*categories.length}px` : '0px'}}>
                            {categories.map((data, index) => {
                                return (
                                    <div className='catalogPage__body__options__categories__body__item' key={index}>
                                        <div className='catalogPage__body__options__colors__body__item-wrapper'>
                                            <CheckboxButton name={data.field} formFunction={register}/>
                                            <label className='catalogPage__body__options__categories__body__item-wrapper-text' htmlFor={data.field}>{data.field}</label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <hr  className='catalogPage__body__options-separator'/>
                    <div className='catalogPage__body__options__brands'>
                        <div className='catalogPage__body__options__brands__header'>
                            <label className='catalogPage__body__options__brands__header-header' htmlFor='brands'>Марки</label>
                            <input type="checkbox" id="brands" className='catalogPage__body__options__brands__header-input' onChange={handleBrandsButtonChanges}/>
                            <label htmlFor='brands' className='catalogPage__body__options__brands__header-button'>
                                <div></div>
                                <div></div>
                            </label>
                        </div>
                        <div className='catalogPage__body__options__brands__body' style={{height: brandsButtonChecked ? `${30*brands.length}px` : '0px'}}>
                            {brands.map((data, index) => {
                                return (
                                    <div className='catalogPage__body__options__brands__body__item' key={index}>
                                        <div className='catalogPage__body__options__brands__body__item-wrapper'>
                                            <CheckboxButton name={`${data.field}`} formFunction={register} checked={selectedItems.includes(`${data.field}`)} onChange={() => handleChanges(`${data.field}`)}/>
                                            <label className='catalogPage__body__options__brands__body__item-wrapper-text' htmlFor={`${data.field}`}>{data.field}</label>
                                        </div>
                                        <label className='catalogPage__body__options__brands__body__item-amount' htmlFor={`${data.field}`}>({data.summ})</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>



                    <hr  className='catalogPage__body__options-separator'/>
                    <div className='catalogPage__body__options__colors'>
                        <div className='catalogPage__body__options__colors__header'>
                            <label className='catalogPage__body__options__colors__header-header' htmlFor='colors'>Цвета</label>
                            <input type="checkbox" id="colors" className='catalogPage__body__options__colors__header-input' onChange={handleColorsButtonChanges}/>
                            <label htmlFor='colors' className='catalogPage__body__options__colors__header-button'>
                                <div></div>
                                <div></div>
                            </label>
                        </div>
                        <div className='catalogPage__body__options__colors__body' style={{height: colorsButtonChecked ? `${30*colors.length}px` : '0px'}}>
                            {colors.map((data, index) => {
                                return (
                                    <div className='catalogPage__body__options__colors__body__item' key={index}>
                                        <div className='catalogPage__body__options__colors__body__item-wrapper'>
                                            <CheckboxButton name={`${data.field}`} formFunction={register}/>
                                            <label className='catalogPage__body__options__colors__body__item-wrapper-text' htmlFor={`${data.field}`}>{data.field}</label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>



                    <button className='catalogPage__body__options-button'>Сбросить фильтр</button>
                </form>
                <div className='catalogPage__body__items'>
                    {filteredItems.map((data, index) => {
                        return (
                            <div className='catalogPage__body__items__item' key={index}>
                                <Card
                                    id = {data._id}
                                    itemName = {`${data.brand} ${data.model}`}
                                    itemCountry = {data.countryImage}
                                    itemAmount = {data.amount}
                                    itemImage = {data.productImage}
                                    itemPrice = {data.price}
                                    linkTo = {`/catalog/bicycles/${data._id}`}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}