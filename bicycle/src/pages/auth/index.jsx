import { useContext } from "react";
import React, { useState } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../../requests/request";
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

    const onSubmit = (data) => {
        // getAuth().then(({data}) => {
        //     navigate('/');
        //     setIsAuth(true);
        //     localStorage.setItem("token", data[0].token)
        // });
        console.log({
            "name": userName,
            "password": userPassword
        })
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

                {/* <p className="auth__wrapper__text">Имя пользователя</p>
                <input type="text" className="auth__wrapper__input" onChange={(elem) => { setUserName(elem.target.value) }}/> */}
                {/* <p className="auth__wrapper__text">Пароль</p>
                <input type="password" className="auth__wrapper__input" onChange={(elem) => { setUserPassword(elem.target.value) }}/> */}
                <div className="auth__wrapper__lowerBox">
                    <input type="checkbox" className="auth__wrapper__lowerBox__checkbox"/>
                    <p className="auth__wrapper__lowerBox__text">Запомнить меня</p>
                    <a href="" className="auth__wrapper__lowerBox__link">Забыли пароль?</a>
                </div>
            </div>
        </div>
    );
};