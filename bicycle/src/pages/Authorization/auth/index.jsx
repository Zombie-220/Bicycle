import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { API_URL } from '../../../requests/request';
import { AuthContext, AdminContext } from '../../../App';
import { ValidateInput } from '../../../components/ValidateInputs/Input';
import { Decrypt, Encrypt } from '../../../helpers/AES';

import './style.scss';

export const AuthPage = () => {
    const { setIsAuth } = useContext(AuthContext);
    const { setIsAdmin } = useContext(AdminContext);
    const [formErr, setFormErr] = useState('');
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm();
    const navigate = useNavigate();

    function onSubmit(submitData) {
        const encryptesSubmitData = {
            name: Encrypt(submitData.name),
            password: Encrypt(submitData.password),
            getToken: submitData.remembeMe
        };

        API_URL.post('/users/login', {
            name: encryptesSubmitData.name,
            password: encryptesSubmitData.password,
            getToken: encryptesSubmitData.remembeMe
        }).then(({ data }) => {
            const decryptedId = {
                id: Decrypt(data.id),
                token: data.token ? Decrypt(data.token) : ''
            }
            if (decryptedId.id) {
                setIsAuth(decryptedId.id);
                if (decryptedId.token) { localStorage.setItem('token', JSON.stringify(decryptedId.token)); }

                API_URL(`/users/check?isAdmin=${data.id}`).then(({ data }) => {
                    if (data.response) { setIsAdmin(true); }
                }).catch(() => { setFormErr('Сайту не хорошо @_@. Попробуйте позже.1'); });

                navigate('/');
            } else {
                setError('name', { type: 'empty' });
                setError('password', { type: 'incorrect' });
            }
        }).catch(() => { setFormErr('Сайту не хорошо @_@. Попробуйте позже.2'); });
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