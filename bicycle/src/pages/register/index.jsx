import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../App";
import { ValidateInput } from "../../components/ValidateInput";

import './style.scss'

export const Register = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [againUserPassword, setagainUserPassword] = useState('');
    const [isRegistrationError, setIsRegistrationError] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    function onSubmit() {
        if (userPassword === againUserPassword) { setIsRegistrationError(false); }
        else { setIsRegistrationError(true); }
        console.log({
            "username": username,
            "userEmail": userEmail,
            "userPassword": userPassword,
            "againUserPassword": againUserPassword
        });
    };

    return (
        <div className="register">
            <div className="register__headerBackground" />
            <div className="register__wrapper">
                <div className="register__wrapper__header">
                    <button className="register__wrapper__header__signup">Регистрация</button>
                    <Link to={'/auth'} className="register__wrapper__header__login">Войти</Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ValidateInput 
                        textLabel={"Имя пользователя"}
                        errors={errors}
                        name={"username"}
                        register={register}
                        validate={{ required: true }}
                        type={"text"}
                        changeValue={(elem) => { setUsername(elem.target.value) }}
                    />
                    <ValidateInput 
                        textLabel={"E-mail"}
                        errors={errors}
                        name={"e-mail"}
                        register={register}
                        validate={{ required: true }}
                        type={"text"}
                        changeValue={(elem) => { setUserEmail(elem.target.value) }}
                    />
                    <ValidateInput 
                        textLabel={"Пароль"}
                        errors={errors}
                        name={"password1"}
                        register={register}
                        validate={{ required: true }}
                        type={"password"}
                        changeValue={(elem) => { setUserPassword(elem.target.value) }}
                    />
                    <ValidateInput 
                        textLabel={"Подтвердите пароль"}
                        errors={errors}
                        name={"password2"}
                        register={register}
                        validate={{ required: true }}
                        type={"password"}
                        changeValue={(elem) => { setagainUserPassword(elem.target.value) }}
                    />
                    {isRegistrationError && (<p className="register__wrapper__errorMessage">Пароли не совпадают</p>)}
                    <button className="register__wrapper__enterButton">Регистрация</button>
                </form>
            </div>
        </div>
    );
};