import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Transition } from 'react-transition-group';

import { ValidateInput } from "../../components/ValidateInput";
import { AuthContext } from "../../App";
import { baseURL } from "../../requests/request";

import './authModalWindow.scss';

export const AuthModalWindow = ({ isOpen, onClose }) => {
    const onWrapperClick = (event) => {if (event.target.classList.contains("authModal__wrapper")) {onClose()}}

    const [passwordErr, setPasswordErr] = useState('');

    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm();

    function onSubmit(data) {
        baseURL.post('/users/login', { name: data.name, password: data.password }).then((resp) => {
            console.log(resp.data.response);
            if (resp.data.response) {
                setIsAuth(true);
                onClose();
                reset();
                setPasswordErr('');
            } else { setPasswordErr('Введённые данные не корректны'); }
        }).catch((err) => { setPasswordErr('Что-то пошло не так x_x.'); })
    };

    return (
        <Transition in={isOpen} timeout={350} unmountOnExit={true}>
            { (state) => 
                (<div className={`authModal authModal--${state}`}>
                <div className="authModal__wrapper" onClick={onWrapperClick}>
                    <div className="authModal__wrapper__content">
                        <button className="authModal__wrapper__content__closeButton" onClick={()=>onClose()}>X</button>
                        <div className="authModal__wrapper__content__authBody">
                            <p className="authModal__wrapper__content__authBody__header">Войти</p>
                            <div className="authModal__wrapper__content__authBody__wrapper">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <ValidateInput
                                        textLabel={"Имя пользователя"}
                                        errors={errors}
                                        name={"name"}
                                        formFunction={register}
                                        validate={{ required: true }}
                                        type={"text"}
                                    />
                                    <ValidateInput
                                        textLabel={"Пароль"}
                                        errors={errors}
                                        name={"password"}
                                        formFunction={register}
                                        validate={{ required: true }}
                                        type={"password"}
                                    />
                                    <p className="authModal__wrapper__content__authBody__wrapper-text">{passwordErr}</p>
                                    <button className="authModal__wrapper__content__authBody__wrapper__enterButton" disabled={!isValid}>Войти</button>
                                </form>
                                <div className="authModal__wrapper__content__authBody__wrapper__lowerBox">
                                    <input type="checkbox" className="authModal__wrapper__content__authBody__wrapper__lowerBox__checkbox"/>
                                    <p className="authModal__wrapper__content__authBody__wrapper__lowerBox__text">Запомнить меня</p>
                                    <Link className="authModal__wrapper__content__authBody__wrapper__lowerBox__link">Забыли пароль?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </Transition>
    );
};