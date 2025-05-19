import { Link, useLocation } from "react-router-dom";
import { Layout } from "../../navigation/layout";

import './style.scss';

export const SignPage = () => {
    const location = useLocation();

    return (
        <div className="signPage">
            <div className='signPage__header'>
                <Link to={'/sign/in'} className={`signPage__header-link${location.pathname === '/sign/in' ? '-active' : ''}`}>Войти</Link>
                <Link to={'/sign/up'} className={`signPage__header-link${location.pathname === '/sign/up' ? '-active' : ''}`}>Регистрация</Link>
            </div>
            <div>
                <Layout />
            </div>
        </div>
    );
}