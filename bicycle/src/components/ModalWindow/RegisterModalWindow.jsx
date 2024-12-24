import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Transition } from 'react-transition-group';

import { ValidateInput } from "../../components/ValidateInput";
import { AuthContext } from "../../App";

import './registerModalWindow.scss';
import { API_URL } from "../../requests/request";

export const RegisterModalWindow = ({ isOpen, onClose }) => {
    const onWrapperClick = (event) => {if (event.target.classList.contains("registerModal__wrapper")) {onClose()}}

    const [registerErr, setRegisterErr] = useState('');

    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm();

    function onSubmit(data) {
        if (data.password === data.confirmPassword) {
            API_URL.post('/users/checkName', { name: data.name }).then((resp) => {
                if (!resp.data.response) {
                    API_URL.post('/users/add', { name: data.name, email: data.email, password: data.password }).then((resp) => {
                        setIsAuth(resp.data.response);
                        onClose();
                        reset();
                        setRegisterErr('');
                    }).catch((err) => { setRegisterErr('Что-то пошло не так >_<"'); });
                } else { setRegisterErr("Пользователь уже существует"); }
            }).catch((err) => { setRegisterErr('Что-то пошло не так x_x'); });
        } else { setRegisterErr("Пароли не совпадают"); }
        onClose();
    };

    return (
        <Transition in={isOpen} timeout={350} unmountOnExit={true}>
            { (state) => 
                (<div className={`registerModal registerModal--${state}`}>
                <div className="registerModal__wrapper" onClick={onWrapperClick}>
                    <div className="registerModal__wrapper__content">
                        <button className="registerModal__wrapper__content__closeButton" onClick={()=>onClose()}>X</button>
                        <div className="registerModal__wrapper__content__regBody">
                            <p className="authModal__wrapper__content__authBody__header">Регистрация</p>
                            <div className="registerModal__wrapper__content__regBody__wrapper">
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
                                        textLabel={"E-mail"}
                                        errors={errors}
                                        name={"email"}
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
                                    <ValidateInput
                                        textLabel={"Подтвердите пароль"}
                                        errors={errors}
                                        name={"confirmPassword"}
                                        formFunction={register}
                                        validate={{ required: true }}
                                        type={"password"}
                                    />
                                    <p className="registerModal__wrapper__content__regBody__wrapper-text">{registerErr}</p>
                                    <button className="registerModal__wrapper__content__regBody__wrapper__enterButton" disabled={!isValid}>Регистрация</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </Transition>
    );
};