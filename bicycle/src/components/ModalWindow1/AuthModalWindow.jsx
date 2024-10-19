import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Transition } from 'react-transition-group';

import { ValidateInput } from "../../components/ValidateInput";
import { AuthContext } from "../../App";

import './authModalWindow.scss';

export const AuthModalWindow = ({ isOpen, onClose }) => {
    const onWrapperClick = (event) => {if (event.target.classList.contains("authModal__wrapper")) {onClose()}}

    const { isAuth, setIsAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        var userData = JSON.parse(localStorage.getItem('user'))
        if (userData.name == data.name && userData.password == data.password) {
            setIsAuth(true);
            navigate('/')
        } else {
            console.log("x")
        }
    }

    return (
        <Transition in={isOpen} timeout={350} unmountOnExit={true}>
            { (state) => 
                (<div className={`authModal authModal--${state}`}>
                <div className="authModal__wrapper" onClick={onWrapperClick}>
                    <div className="authModal__wrapper__content">
                        <button className="authModal__wrapper__content__closeButton" onClick={()=>onClose()}>X</button>
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
                                    />
                                    <ValidateInput
                                        textLabel={"Пароль"}
                                        errors={errors}
                                        name={"password"}
                                        register={register}
                                        validate={{ required: true }}
                                        type={"password"}
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
                    </div>
                </div>
            </div>)}
        </Transition>
    );
};