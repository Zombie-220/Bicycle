import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { API_URL } from '../../requests/request';
import { Card } from '../../components/card';

import './style.scss';

export const Bicycle = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        API_URL.get('/products/all').then(resp => {
            setProducts(resp.data)
        }).catch(err => {console.log(err)})
    }, []);

    return (
        <div className='bicyclePage'>
            <div className='bicyclePage-backgroundColor'></div>
            <div className='bicyclePage__main'>
                <div className='bicyclePage__main__welcome'>
                    <div className='bicyclePage__main__welcome-links'>
                        <Link to={'/'} className='bicyclePage__main__welcome-links-link'>Главная</Link>
                        <p className='bicyclePage__main__welcome-links-text'>|</p>
                        <Link to='/bicycle' className='bicyclePage__main__welcome-links-link activeLink'>Велосипеды</Link>
                    </div>
                    <p className='bicyclePage__main__welcome-headerText'>ГОРНЫЕ ВЕЛОСИПЕДЫ</p>
                </div>
            </div>
            <div className='bicyclePage__body'>
                <div className='bicyclePage__body-grid'>
                    {products.map((data, index) => {
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
                    })}
                </div>
            </div>
        </div>
    );
}