import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Transition } from 'react-transition-group';

import { ValidateInput } from "../../components/ValidateInput";
import { AuthContext } from "../../App";

import './registerModalWindow.scss';
import { baseURL } from "../../requests/request";

export const RegisterModalWindow = ({ isOpen, onClose }) => {
    const onWrapperClick = (event) => {if (event.target.classList.contains("registerModal__wrapper")) {onClose()}}

    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm();

    function onSubmit(data) {
        if (data.password === data.confirmPassword) {
            baseURL.get(`/users/${data.name}`).then((res) => {
                if (res.response) {
                    // setIsAuth(true);
                    // onClose();
                    // reset();
                    // baseURL.post('/users', {
                    //     userName: data.name,
                    //     password: data.password,
                    //     email: data.email
                    // }).then().catch((err) => { console.log(err); })
                    console.log(res.response)
                }
            }).catch((err) => { console.log(err); })
        }
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