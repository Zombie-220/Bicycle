import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { API_URL } from '../../../requests/request';
import { AuthContext, AdminContext } from '../../../App';
import { ValidateInput } from '../../../components/ValidateInput';

import './style.scss';

export const AuthPage = () => {
    const { setIsAuth } = useContext(AuthContext);
    const { setIsAdmin } = useContext(AdminContext);
    const [formErr, setFormErr] = useState('');
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
        API_URL.post('/users/login', {
            name: data.name,
            password: data.password,
            getToken: data.remembeMe
        }).then(({ data }) => {
            if (data.id) {
                setIsAuth(data.id);
                if (data.token) { localStorage.setItem('token', JSON.stringify(data.id)); }

                API_URL(`/users/isAdmin/${data.id}`).then(({ data }) => {
                    if (data.response) { setIsAdmin(true); }
                }).catch(() => { setFormErr('Сайту не хорошо @_@. Попробуйте позже.'); });

                navigate('/');
            } else { setFormErr('Введен неверный логин или пароль'); }
        }).catch(() => { setFormErr('Сайту не хорошо @_@. Попробуйте позже.'); });
    }

    return (
        <div className="authPage">
            <div className='authPage__header'>
                <Link className='authPage__header-link authPage__header-link-active'>Войти</Link>
                <Link to={'/register'} className='authPage__header-link'>Регистрация</Link>
            </div>
            <form className='authPage__body' onSubmit={handleSubmit(onSubmit)}>
                <ValidateInput
                    textLabel={"Имя пользователя"}
                    errors={errors}
                    name={"name"}
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
                <p className='authPage__body-errorMessage'>{formErr}</p>
                <button className='authPage__body-button' disabled={!isValid}>Войти</button>
                <div className='authPage__body__footer'>
                    <div className='authPage__body__footer__wrapper'>
                        <label className='authPage__body__footer__wrapper-checkbox'>
                            <input className='authPage__body__footer__wrapper-checkbox-input' type="checkbox" {...register('remembeMe')} id='idRemembeMe' />
                            <span className='authPage__body__footer__wrapper-checkbox-checkmark'></span>
                        </label>
                        <label className='authPage__body__footer__wrapper-label' htmlFor="idRemembeMe">Запомнить меня</label>
                    </div>
                    <Link to={'/auth/recover'} className='authPage__body__footer-link'>Забыли пароль?</Link>
                </div>
            </form>
        </div>
    );
}