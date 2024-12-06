import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { SwipeSlider } from '../../components/SwipeSlider';
import { Card } from '../../components/card';
import { AddedProductsToCart, ProductContext } from '../../App';
import { baseURL } from '../../requests/request';
import { GetHook } from '../../hooks/getHook';
import { Preloader } from '../../components/Preloader';

import './style.scss';

export const Order = () => {
    const { currentProduct } = useContext(ProductContext);
    const { addedProductToCart, setAddedProductToCart } = useContext(AddedProductsToCart);
    const { newItems, isLoading } = GetHook({ url: '/products/amount/4' });
    const [product, setProduct] = useState({});
    const [counter, setCounter] = useState(0);
    const [productAdded, setProductAdded] = useState(false);
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();

    function minusCounter() {if (counter > 1) { setCounter(counter - 1); }}
    function plusCounter() {if (counter < product.amount) { setCounter(counter + 1); }}

    function addToCart() {
        const radioButtons = document.querySelectorAll('input[name="radio"]');
        let selectedValue;
        
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                selectedValue = radioButton.value;
                break;
            }
        }

        let x = addedProductToCart;
        setAddedProductToCart([...x, {productId: product._id, amount: counter, size: selectedValue}]);

        setProductAdded(true);
    }

    useEffect(() => {
        if (currentProduct) {
            baseURL.get(`/products/byID/${currentProduct}`).then(resp => {
                setProduct(resp.data);
                setPrice(resp.data.price)
            }).catch(err => { console.log(err); })
            setCounter(0);
        } else { navigate('/bicycle'); }
    }, [currentProduct]);

    useEffect(() => {
        setTimeout(() => { setProductAdded(false) }, 5000);
    }, [productAdded])

    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='order'>
            <div className='order__heeaderBackground'></div>
            <div className='order__wrapper'>
                <p className='order__wrapper__links'>
                    <Link to='/' className='order__wrapper__links-link'>Главная</Link>
                    <p className='order__wrapper__links-border'>|</p>
                    <Link to='/bicycle' className='order__wrapper__links-link'>Велосипеды</Link>
                    <p className='order__wrapper__links-border'>|</p>
                    <Link to='/order' className='order__wrapper__links-link activeLink'>{product.name}</Link>
                </p>
                <div className='order__wrapper__body'>
                    <div className='order__wrapper__body__leftSide'>
                        <img src={product.productImage} alt="productImage" className='order__wrapper__body__imgWrapper-img'/>
                    </div>
                    <div className='order__wrapper__body__rightSide'>
                        <p className='order__wrapper__body__rightSide-productName'>{product.name}</p>
                        <p className='order__wrapper__body__rightSide-amount' style={{color: (product.amount > 0? '#4D932C' : '#F53A20')}}>{product.amount > 0? 'В наличии' : 'Распродано'}</p>
                        <p className='order__wrapper__body__rightSide-cost'>{price.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
                        <div className='order__wrapper__body__rightSide__dimensions'>
                            <div className="radio-inputs">
                                <label className="radio">
                                    <input type="radio" name="radio" value={"X"}/>
                                    <span className="name">X</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="radio" value={"M"}/>
                                    <span className="name">M</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="radio" value={"L"}/>
                                    <span className="name">L</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="radio" value={"XL"}/>
                                    <span className="name">XL</span>
                                </label>
                            </div>
                        </div>
                        <div className="order__wrapper__body__rightSide__counters">
                            <div className='order__wrapper__body__rightSide__counters-wrapper'>
                                <button className='order__wrapper__body__rightSide__counters-wrapper-minus' onClick={minusCounter}>-</button>
                                <div className='order__wrapper__body__rightSide__counters-wrapper-counter'>{counter}</div>
                                <button className='order__wrapper__body__rightSide__counters-wrapper-plus' onClick={plusCounter}>+</button>
                            </div>
                            <button className='order__wrapper__body__rightSide__counters-addToCart' onClick={addToCart} disabled={counter > 0 ? false : true}>В корзину</button>
                        </div>
                        <p className='order__wrapper__body__rightSide-finalPrice'>Итиго: {(price*counter).toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽</p>
                        <p className='order__wrapper__body__rightSide-text' style={{display: (productAdded? 'block': 'none')}}>Заказ оформлен</p>
                    </div>
                </div>
            </div>
            <div className='order__sameProducts'>
                <p className='order__sameProducts-header'>Похожие товары</p>
                <div className='main__newItems__cards'>
                    <Preloader isLoading={isLoading}>
                        {
                            newItems?.map((data, index) => {
                                return (
                                    <Card
                                        key={index}
                                        id={data._id}
                                        bicycleIMG={data.productImage}
                                        countryIMG={data.countryImage}
                                        name={data.name}
                                        price={data.price}
                                        amount={data.amount}
                                    />
                                )
                            })
                        }
                    </Preloader>
                </div>
                <div className='main__newItems__mobileCards'>
                    <Preloader isLoading={isLoading}>
                        <SwipeSlider childSize={windowSize.width>=350 ? 250:200}>
                            {
                                newItems?.map((data, index) => {
                                    return (
                                        <div key={index}>
                                            <Card
                                                id={data._id}
                                                bicycleIMG={data.productImage}
                                                countryIMG={data.countryImage}
                                                name={data.name}
                                                price={data.price}
                                                amount={data.amount}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </SwipeSlider>
                    </Preloader>
                </div>
            </div>
        </div>
    );
}