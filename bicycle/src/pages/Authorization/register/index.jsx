import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { ValidateInput } from '../../../components/ValidateInputs/Input';
import { API_URL } from '../../../requests/request';
import { AuthContext } from '../../../App';

import './style.scss';

export const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();
    const [formErr, setFormErr] = useState();
    const { setIsAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    function onSubmit(formData) {
        if (formData.password_confirmed === formData.password) {
            API_URL.post('/users/checkName', { name: formData.name }).then(({ data }) => {
                if (!data.response) {
                    API_URL.post('/users/add', {
                        name: formData.name,
                        password: formData.password,
                        email: formData.email
                    }).then((respData) => {
                        setIsAuth(respData.data.response);
                        navigate('/');
                    }).catch(() => { setFormErr('Сайту не хорошо @_@. Попробуйте позже.') });
                } else { setFormErr('Данное имя уже занято'); }
            }).catch(() => { setFormErr('Сайту не хорошо @_@. Попробуйте позже.') });
        } else { setFormErr('Пароли не совподают') }
    }

    return (
        <div className="registerPage">
            <div className='registerPage__header'>
                <Link className='registerPage__header-link registerPage__header-link-active'>Регистрация</Link>
                <Link to={'/auth'} className='registerPage__header-link'>Войти</Link>
            </div>
            <form className='registerPage__body' onSubmit={handleSubmit(onSubmit)}>
                <ValidateInput
                    textLabel={"Имя пользователя"}
                    errors={errors}
                    name={"name"}
                    formFunction={register}
                    validate={{ required: true }}
                />
                <ValidateInput
                    textLabel={"E-mail"}
                    errors={errors}
                    name={"email"}
                    formFunction={register}
                    validate={{ required: true }}
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
                    name={"password_confirmed"}
                    formFunction={register}
                    validate={{ required: true }}
                    type={"password"}
                />
                <p className='registerPage__body-errorMessage'>{formErr}</p>
                <button className='registerPage__body-button' disabled={!isValid}>Регистрация</button>
            </form>
            <p className='registerPage-bottomText'>Уже регистрировались? <Link to={'/auth'} className='registerPage-bottomText-link'>Войти</Link></p>
        </div>
    );
}