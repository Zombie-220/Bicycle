import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { DivSlider } from '../../components/DivSlider';
import { LoopImageSlider } from '../../components/LoopImageSlider';
import { Card } from '../../components/card';
import { getNewItems } from '../../requests/request';
import { AuthContext } from '../../App';

import './style.scss';
import '../../assets/fonts/fonts.css';

import newItemsImage from '../../assets/images/image.png';
import countryImage from '../../assets/images/country.png';

export const Main = () => {
    const [newItems, setNewItems] = useState([])
    const { isAuth, setIsAuth } = useContext(AuthContext);

    useEffect(() => {
        getNewItems().then((data) => {
            if (data.data && data.status === 200) {
                setNewItems(data.data)
            }
        }).catch((error) => { console.log(error) })
    }, [])

    return (
        <div className='main'>
            <div className='main__welcomeDiv'>
                <h1 className='main__welcomeDiv__header'>ЭЛЕКТРО<br/>ВЕЛОСИПЕДЫ</h1>
                <p className='main__welcomeDiv__text'>Cento10 Hybrid — это гоночный велосипед c помогающим<br/>педалированию электроприводом, который устанавливает новый,<br/>очень высокий стандарт для данной категории</p>
                {!isAuth && (<Link to='/auth' className='main__welcomeDiv__link'>Подробнее</Link>)}
                {isAuth && (<Link to='/bicycle' className='main__welcomeDiv__link'>Подробнее</Link>)}
            </div>
            <DivSlider />
            <LoopImageSlider />
            <div className='main__newItems'>
                <h2 className='main__newItems__header'>НОВИНКИ</h2>
                <div className='main__newItems__cards'>
                    {
                        newItems.map((data, index) => {
                            return (
                                <Card
                                    key={index}
                                    imageIMG={newItemsImage}
                                    countryIMG={countryImage}
                                    name={data.name}
                                    price={data.price}
                                    status={data.status}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};