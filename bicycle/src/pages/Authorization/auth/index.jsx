import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import { API_URL } from '../../../requests/request';
import { AuthContext, AdminContext } from '../../../App';
import { ValidateInput } from '../../../components/ValidateInputs/Input';
import { Decrypt, Encrypt } from '../../../helpers/AES';

import { CheckboxButton } from '../../../components/Buttons/checkbox';

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
            getToken: encryptesSubmitData.getToken
        }).then(({ data }) => {
            const decryptedId = { id: Decrypt(data.id) };
            if (decryptedId.id) {
                setIsAuth(decryptedId.id);
                if (encryptesSubmitData.getToken) { Cookies.set('token', data.token, { expires: 7 }); }
                else { Cookies.set('token', data.token, { expires: 1 }); }

                API_URL(`/users/check?isAdmin=${data.id}`).then(({ data }) => {
                    if (data.response) { setIsAdmin(true); }
                }).catch(() => { setFormErr('Сайту не хорошо @_@. Попробуйте позже.'); });

                navigate('/');
            } else {
                setError('name', { type: 'empty' });
                setError('password', { type: 'incorrect' });
            }
        }).catch((err) => {
            if (err.response.data.message === 'wrong data') { setFormErr('Имя или пароль введены неверно.'); }
            else { setFormErr('Сайту не хорошо @_@. Попробуйте позже.'); }
        });
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
                />
                <ValidateInput
                    textLabel={"Пароль"}
                    errors={errors}
                    name={"password"}
                    formFunction={register}
                    type={"password"}
                />
                <p className='authPage__body-errorMessage'>{formErr}</p>
                <button className='authPage__body-button' disabled={!isValid}>Войти</button>
                <div className='authPage__body__footer'>
                    <div className='authPage__body__footer__wrapper'>
                        <CheckboxButton name={"remembeMe"} formFunction={register} />
                        <label className='authPage__body__footer__wrapper-label' htmlFor="remembeMe">Запомнить меня</label>
                    </div>
                    <Link to={'/auth/recover'} className='authPage__body__footer-link'>Забыли пароль?</Link>
                </div>
            </form>
        </div>
    );
}