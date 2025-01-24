import React, { useEffect, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

import { Header } from "../header"
import { AuthContext, AdminContext } from '../../App';

import './style.scss'

export const ErrorPage = () => {
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);
    const { isAdmin } = useContext(AdminContext);

    useEffect(() => {
        navigate(Cookies.get('lastUsedPath'));
    }, [isAuth, isAdmin])

    return (
        <>
            <Header/>
            <div className="error">
                <h1 className="error__header">404</h1>
                <p className="error__text">Страница не найдина</p>
                <p className="error__text-litle">Возможно страница была перенесена или её не существует</p>
                <Link to='/' className="error__link">На главную</Link>
            </div>
        </>
    )
}