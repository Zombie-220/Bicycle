import React from 'react';
import { Link } from 'react-router-dom'
import { useContext } from 'react';

import { AuthContext } from '../../App';

/**
 * Ссылка для открытия страницы авторизации, если пользователь не авторизован
 * @param {Object} props props
 * @param {string} props.to куда ведет, если авторизован
 * @param {string} props.className className компонента
 * @param {*} props.children дочерние элементы
 * @returns {React.JSX.Element}
*/
export const DiffLink = ({ to, className, children }) => {
    const { isAuth } = useContext(AuthContext);

    if (isAuth) { return <Link to={to} className={className}>{children}</Link> }
    else { return <Link to={'/auth'} className={className}>{children}</Link> }
}