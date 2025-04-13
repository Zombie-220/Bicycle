import { Link, Outlet, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { API_URL } from '../../requests/request';

import './style.scss';

export const AdminPage = () => {
    const [lastUrlPath, setLastUrlPath] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const {} = useParams();

    useEffect(() => {
        API_URL.get('/users/all').then(({ data }) => {
            setAllUsers(data);
        }).catch((err) => { console.log(err); });
    }, []);

    useEffect(() => {
        const fullUrl = window.location.href.split('/');
        setLastUrlPath(fullUrl[fullUrl.length-1]);
    }, [window.location.href]);
    
    return (
        <div className="adminPage">
            <div className='adminPage__leftSide'>
                <p className='adminPage__leftSide-header'>Мой аккаунт</p>
                <Link className={`adminPage__leftSide-link ${lastUrlPath=='admin' && 'activeAdminPageLink'}`} to={`/admin`}>Заказы</Link>
                <Link className={`adminPage__leftSide-link ${lastUrlPath=='users' && 'activeAdminPageLink'}`} to={`/admin/users`}>Пользователи</Link>
                <Link className={`adminPage__leftSide-link ${lastUrlPath=='bicycles' && 'activeAdminPageLink'}`} to={`/admin/bicycles`}>Велосипеды</Link>
                <Link className={`adminPage__leftSide-link ${lastUrlPath=='parts' && 'activeAdminPageLink'}`} to={`/admin/parts`}>Запчасти</Link>
            </div>
            <div className='adminPage__rightSide'>
                {lastUrlPath === 'admin' ?
                   <div>
                        {allUsers.map((data, index) => {
                            return (
                                <div key={index}>{data.name}</div>
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