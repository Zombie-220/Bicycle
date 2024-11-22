import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DivSlider } from '../../components/DivSlider';
import { LoopImageSlider } from '../../components/LoopImageSlider';
import { Card } from '../../components/card';
import { AuthContext } from '../../App';
import { removeOneNewItems } from '../../requests/request';
import { CreateProduct } from '../../components/ModalWindow/CreateProduct';
import { EditProduct } from '../../components/ModalWindow/EditProduct';
import { Preloader } from '../../components/Preloader';
import { SwipeSlider } from '../../components/SwipeSlider';

import { NewBicycles } from '../../requests/const';
import { GetHook } from '../../hooks/getHook';

import './style.scss';
import '../../assets/fonts/fonts.css';

import axios from 'axios';

export const Main = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState({ status: false, id: null });

    const { newItems, setNewItems, isLoading, error, useQuery } = GetHook({ url: NewBicycles });
    const addProduct = () => { setIsModalOpen(true); };
    const onCloseModal = () => { setIsModalOpen(false); };

    const removeProduct = (id) => {
        removeOneNewItems(id).then(({}) => {
            setNewItems((prevValue) =>
            prevValue.filter((product) => product.id !== id)
        );}).catch(() => alert("Ошибка"));
    };

    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    useEffect(() => {


        axios.post('http://localhost:5000/test', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        })
          .then(response => {
            console.log(response.data);
        })
          .catch(error => {
            console.error('Ошибка при выполнении POST-запроса:', error);
        });


        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                {/* <button onClick={addProduct}>Добавить карточку</button>
                <button onClick={useQuery}>Перезагрузить запрос</button>
                <button onClick={useQuery}>Получить данные</button> */}

                <div className='main__newItems__cards'>
                    <Preloader isLoading={isLoading}>
                        {
                            newItems?.map((data, index) => {
                                return (
                                    <Card
                                        key={index}
                                        imageIMG={data.imagePath}
                                        countryIMG={data.countryImage}
                                        name={data.name}
                                        price={data.price}
                                        status={data.status}
                                        id={data.id}
                                        onEdit={setIsEdit}
                                        onRemove={removeProduct}
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
                                                imageIMG={data.imagePath}
                                                countryIMG={data.countryImage}
                                                name={data.name}
                                                price={data.price}
                                                status={data.status}
                                                id={data.id}
                                                onEdit={null}
                                                onRemove={null}
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

            {/* <CreateProduct
                setProducts={setNewItems}
                onCloseModal={onCloseModal}
                isModalOpen={isModalOpen}
            />
            {isEdit.status && (
                <EditProduct
                    setProducts={setNewItems}
                    onCloseModal={setIsEdit}
                    isModalOpen={isEdit.status}
                    initialValues={ newItems.filter((product) => product.id === isEdit.id)[0] }
                    setIsEdit={setIsEdit}
                    id={isEdit.id}
                />)
            } */}
        </div>
    );
};