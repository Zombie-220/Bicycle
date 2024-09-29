import React from "react"
import { Link } from 'react-router-dom'

import './style.scss'
import '../../assets/fonts/fonts.css'

export const ErrorPage = () => {
    return (
        <div className="error">
            <h1 className="error__header">404</h1>
            <p className="error__text">Страница не найдина</p>
            <p className="error__text">Возможно страница была перенесена или её не существует</p>
            <Link to='/' className="error__link">На главную</Link>
        </div>
    )
}