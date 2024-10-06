import React, { useState } from "react";

import './style.scss';

import { getProfile } from "../../requests/request";

export const Auth = () => {
    const [userName, setUserName] = useState('test');
    const [userPassword, setUserPassword] = useState('testPass123');

    function Login() {
        console.log({
            "username": userName,
            "password": userPassword
        })
    }

    return (
        <div className="auth">
            <div className="auth__headerBackground" />
            <div className="auth__wrapper">
                <div className="auth__wrapper__header">
                    <button className="auth__wrapper__header__login">Войти</button>
                    <button className="auth__wrapper__header__signup">Регистрация</button>
                </div>
                <p className="auth__wrapper__text">Имя пользователя</p>
                <input type="text" className="auth__wrapper__input" onChange={(elem) => { setUserName(elem.target.value) }}/>
                <p className="auth__wrapper__text">Пароль</p>
                <input type="password" minlength="8" required className="auth__wrapper__input" onChange={(elem) => { setUserPassword(elem.target.value) }}/>
                <button className="auth__wrapper__enterButton" onClick={() => {Login()}}>Войти</button>
                <div className="auth__wrapper__lowerBox">
                    <input type="checkbox" className="auth__wrapper__lowerBox__checkbox"/>
                    <p className="auth__wrapper__lowerBox__text">Запомнить меня</p>
                    <a href="" className="auth__wrapper__lowerBox__link">Забыли пароль?</a>
                </div>
            </div>
        </div>
    );
};