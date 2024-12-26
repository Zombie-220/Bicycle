import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DivSlider } from '../../components/DivSlider';
import { LoopImageSlider } from '../../components/LoopImageSlider';
import { Card } from '../../components/card';
import { AuthContext } from '../../App';
import { Preloader } from '../../components/Preloader';
import { SwipeSlider } from '../../components/SwipeSlider';
import { API_URL } from '../../requests/request';
import { DiffLink } from '../../components/DiffLink';

import './style.scss';
import '../../assets/fonts/fonts.css';

export const Main = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [isLoading, setIsLoading] = useState(true);
    const [newBicycle, setNewBicycle] = useState([]);

    useEffect(() => {
        API_URL('/products/amount/3').then(({ data }) => {
            setNewBicycle(data);
            setIsLoading(false);
        }).catch((err) => { console.log(err); })

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); };
    }, []);

    return (
        <div className='main'>
            <div className='main__welcomeDiv'>
                <h1 className='main__welcomeDiv__header'>ЭЛЕКТРО<br/>ВЕЛОСИПЕДЫ</h1>
                <p className='main__welcomeDiv__text'>Cento10 Hybrid — это гоночный велосипед c помогающим<br/>педалированию электроприводом, который устанавливает новый,<br/>очень высокий стандарт для данной категории</p>
                <DiffLink to={'/catalog/bicycle'} orTo={'/auth'} className='main__welcomeDiv__link'>Подробнее</DiffLink>
            </div>
            <DivSlider />
            <LoopImageSlider />
            <div className='main__newItems'>
                <h2 className='main__newItems__header'>НОВИНКИ</h2>
                <div className='main__newItems__cards'>
                    <Preloader isLoading={isLoading}>
                        {
                            newBicycle?.map((data, index) => {
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
                                newBicycle?.map((data, index) => {
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
            <div className='main__catalog'>
                <p className='main__catalog__header'>КАТАЛОГ</p>
                <Link to={'/bicycle'} className='main__catalog__link'><p className='main__catalog__link__text'>ВЕЛОСИПЕДЫ</p></Link>
                <div className='main__catalog__container'>
                    <Link to={'/tradeIn'} className='main__catalog__container__link'>
                        <p className='main__catalog__container__link__text'>TRADE-IN</p>
                    </Link>
                    <div className='main__catalog__container__wrapper'>
                        <Link to={'/parts'} className='main__catalog__container__wrapper__link main__catalog__miniSection' id='main__catalog__parts'>
                            <p className='main__catalog__container__wrapper__link__text'>ЗАПЧАСТИ</p>
                        </Link>
                        <Link to={'/accessories'} className='main__catalog__container__wrapper__link' id='main__catalog__accessories'>
                            <p className='main__catalog__container__wrapper__link__text'>АКСЕССУАРЫ</p>
                        </Link>
                    </div>
                    <div className='main__catalog__container__wrapper'>
                        <Link to={'/equipment'} className='main__catalog__container__wrapper__link' id='main__catalog__equipment'>
                            <p className='main__catalog__container__wrapper__link__text'>ЭКИПИРОВКА</p>
                        </Link>
                        <Link to={'/bikeRacks'} className='main__catalog__container__wrapper__link main__catalog__miniSection' id='main__catalog__bikeRacks'>
                            <p className='main__catalog__container__wrapper__link__text'>ВЕЛОСТАНКИ</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};