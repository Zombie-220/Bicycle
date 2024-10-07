import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";

import './style.scss'

export const Register = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [againuserPassword, setAgainUserPassword] = useState('');

    function onSubmit() {
        console.log({
            "username": username,
            "userEmail": userEmail,
            "userPassword": userPassword,
            "againuserPassword": againuserPassword
        })
    }

    return (
        <div className="register">
            <div className="register__headerBackground" />
            <div className="register__wrapper">
                <div className="register__wrapper__header">
                    <button className="register__wrapper__header__signup">Регистрация</button>
                    <Link to={'/auth'} className="register__wrapper__header__login">Войти</Link>
                </div>
                <p className="register__wrapper__text">Имя пользователя</p>
                <input type="text" className="register__wrapper__input" onChange={(elem) => { setUsername(elem.target.value) }}/>
                <p className="register__wrapper__text">E-mail</p>
                <input type="text" className="register__wrapper__input" onChange={(elem) => { setUserEmail(elem.target.value) }}/>
                <p className="register__wrapper__text">Пароль</p>
                <input type="password" className="register__wrapper__input" onChange={(elem) => { setUserPassword(elem.target.value) }}/>
                <p className="register__wrapper__text">Подтвердите пароль</p>
                <input type="password" className="register__wrapper__input" onChange={(elem) => { setAgainUserPassword(elem.target.value) }}/>
                <button className="register__wrapper__enterButton" onClick={onSubmit}>Регистрация</button>
            </div>
        </div>
    );
};