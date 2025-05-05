import { Link, Outlet, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { API_URL } from '../../requests/request';

import { OrderCard } from '../../components/Cards/orderCard';

import './style.scss';

export const AdminPage = () => {
    const [lastUrlPath, setLastUrlPath] = useState('');
    const [allOrders, setAllOrders] = useState([]);
    const {} = useParams();

    useEffect(() => {
        API_URL.get('/orders/all').then(({ data }) => {
            setAllOrders(data);
        }).catch((err) => { console.log(err); });
    }, []);

    useEffect(() => {
        const fullUrl = window.location.href.split('/');
        setLastUrlPath(fullUrl[fullUrl.length-1]);
    }, [window.location.href]);
    
    return (
        <div className="adminPage">
            <div className='adminPage__leftSide'>
                <p className='adminPage__leftSide-header'>Панель администратора</p>
                <Link className={`adminPage__leftSide-link ${lastUrlPath=='admin' && 'activeAdminPageLink'}`} to={`/admin`}>Заказы</Link>
                <Link className={`adminPage__leftSide-link ${lastUrlPath=='users' && 'activeAdminPageLink'}`} to={`/admin/users`}>Пользователи</Link>
                <Link className={`adminPage__leftSide-link ${lastUrlPath=='bicycles' && 'activeAdminPageLink'}`} to={`/admin/bicycles`}>Велосипеды</Link>
                <Link className={`adminPage__leftSide-link ${lastUrlPath=='parts' && 'activeAdminPageLink'}`} to={`/admin/parts`}>Запчасти</Link>
                <Link className={`adminPage__leftSide-link ${lastUrlPath=='equipments' && 'activeAdminPageLink'}`} to={`/admin/equipments`}>Экипировка</Link>
                <Link className={`adminPage__leftSide-link ${lastUrlPath=='accessories' && 'activeAdminPageLink'}`} to={`/admin/accessories`}>Аксессуары</Link>
            </div>
            <div className='adminPage__rightSide'>
                {lastUrlPath === 'admin' ?
                   <div>
                        {allOrders.map((data, index) => {
                            return (
                                <OrderCard
                                    key={index}
                                    id={data.id}
                                    orderInfo={data.orderInfo}
                                    user={data.username}
                                    datetime={data.datetime}
                                    status={data.status}
                                />
                            )
                        })}
                   </div>
                    :
                    <Outlet />
                }
            </div>
        </div>
    );
}