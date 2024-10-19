import { useContext } from "react";
import React, { useState } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ValidateInput } from "../../components/ValidateInput";
import { useForm } from "react-hook-form";

import './style.scss';

export const Auth = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = () => {
        var userData = JSON.parse(localStorage.getItem('user'))
        if (userData.name == userName && userData.password == userPassword) {
            setIsAuth(true);
            navigate('/')
        } else {
            console.log("x")
        }
    }

    return (
        <div className="auth">
            <div className="auth__headerBackground" />
            <div className="auth__wrapper">
                <div className="auth__wrapper__header">
                    <button className="auth__wrapper__header__login">Войти</button>
                    <Link to={'/register'} className="auth__wrapper__header__signup">Регистрация</Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ValidateInput
                        textLabel={"Имя пользователя"}
                        errors={errors}
                        name={"name"}
                        register={register}
                        validate={{ required: true }}
                        type={"text"}
                        changeValue={(elem) => { setUserName(elem.target.value) }}
                    />
                    <ValidateInput
                        textLabel={"Пароль"}
                        errors={errors}
                        name={"password"}
                        register={register}
                        validate={{ required: true }}
                        type={"password"}
                        changeValue={(elem) => { setUserPassword(elem.target.value) }}
                    />
                    <button className="auth__wrapper__enterButton">Войти</button>
                </form>
                <div className="auth__wrapper__lowerBox">
                    <input type="checkbox" className="auth__wrapper__lowerBox__checkbox"/>
                    <p className="auth__wrapper__lowerBox__text">Запомнить меня</p>
                    <a href="" className="auth__wrapper__lowerBox__link">Забыли пароль?</a>
                </div>
            </div>
        </div>
    );
};