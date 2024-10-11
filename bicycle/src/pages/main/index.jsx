import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { DivSlider } from '../../components/DivSlider';
import { LoopImageSlider } from '../../components/LoopImageSlider';
import { Card } from '../../components/card';
import { getNewItems } from '../../requests/request';
import { AuthContext } from '../../App';
import { removeOneNewItems } from '../../requests/request';
import { CreateProduct } from '../../components/ModalWindow/CreateProduct';
import { EditProduct } from '../../components/ModalWindow/EditProduct';
import { Preloader } from '../../components/Preloader';

import { getNewItemsURL } from '../../requests/const';
import { GetHook } from '../../hooks/getHook';

import './style.scss';
import '../../assets/fonts/fonts.css';

import newItemsImage from '../../assets/images/image.png';
import countryImage from '../../assets/images/country.png';

export const Main = () => {
    // const [newItems, setNewItems] = useState([])
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState({ status: false, id: null });
    // const [isLoading, setIsLoading] = useState(true);

    const { newItems, setNewItems, isLoading, error, useQuery } = GetHook({
        url: getNewItemsURL
    });

    const addProduct = () => {
        setIsModalOpen(true);
    };

    const onCloseModal = () => {
        setIsModalOpen(false);
    };

    const removeProduct = (id) => {
        removeOneNewItems(id).then(({}) => {
            setNewItems((prevValue) =>
            prevValue.filter((product) => product.id !== id)
        );}).catch(() => alert("Ошибка"));
    };

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
                <button onClick={addProduct}>Добавить карточку</button>
                <button onClick={useQuery}>Перезагрузить запрос</button>
                <button onClick={useQuery}>Получить данные</button>

                <div className='main__newItems__cards'>
                    <Preloader isLoading={isLoading}>
                        { console.log(newItems) }
                        {
                            newItems?.map((data, index) => {
                                return (
                                    <Card
                                        key={index}
                                        imageIMG={newItemsImage}
                                        countryIMG={countryImage}
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
            </div>
            <CreateProduct
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
            }            
        </div>
    );
};