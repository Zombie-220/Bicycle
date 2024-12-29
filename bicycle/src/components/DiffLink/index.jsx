import React from 'react';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../../App';

/**
 * Компонент для рендера ссылки на разные ресурсы в зависимости от AuthContext
 * @component
*/
export const DiffLink = ({ to, className, children }) => {
    const { isAuth } = useContext(AuthContext);

    if (isAuth) { return <Link to={to} className={className}>{children}</Link> }
    else { return <Link to={'/auth'} className={className}>{children}</Link> }
}

DiffLink.propTypes = {
    /** @type {string} */
    to: PropTypes.string.isRequired,
    /** @type {string} */
    orTo: PropTypes.string.isRequired,
    /** @type {string} */
    className: PropTypes.string.isRequired
};