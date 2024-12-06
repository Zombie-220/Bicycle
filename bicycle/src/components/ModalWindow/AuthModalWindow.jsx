import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Transition } from 'react-transition-group';

import { AdminContext } from "../../App";
import { ValidateInput } from "../../components/ValidateInput";
import { AuthContext } from "../../App";
import { baseURL } from "../../requests/request";

import './authModalWindow.scss';

export const AuthModalWindow = ({ isOpen, onClose }) => {
    const onWrapperClick = (event) => {if (event.target.classList.contains("authModal__wrapper")) {onClose()}}

    const [passwordErr, setPasswordErr] = useState('');

    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { isAdmin, setIsAdmin } = useContext(AdminContext);
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm();

    function onSubmit(data) {
        baseURL.post('/users/login', { name: data.name, password: data.password }).then((resp) => {
            if (resp.data.response) {
                setIsAuth(true);
                onClose();
                reset();
                setPasswordErr('');
                baseURL.get(`/users/isAdmin/${resp.data.id}`).then((data) => {
                    if (data.data.response) { setIsAdmin(true) }
                }).catch((err) => console.log(err))
            } else { setPasswordErr('Введённые данные не корректны'); }
        }).catch((err) => { setPasswordErr('Что-то пошло не так x_x.'); })
        if (document.getElementById('check').checked) {
            localStorage.setItem("token", JSON.stringify("hii"));
        }
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
                                    <input type="checkbox" id="check" className="authModal__wrapper__content__authBody__wrapper__lowerBox__checkbox"/>
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