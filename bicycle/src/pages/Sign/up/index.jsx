import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Cookie from 'js-cookie';

import { ValidateInput } from '../../../components/ValidateInputs/Input';
import { API_URL } from '../../../requests/request';
import { AuthContext } from '../../../App';
import { Decrypt, Encrypt } from '../../../helpers/AES';

import './style.scss';

export const UpPage = () => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors, isValid } } = useForm();
    const [formErr, setFormErr] = useState();
    const { setIsAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!errors.password_confirmed) { clearErrors('password'); }
    }, [errors.password_confirmed]);

    function onSubmit(formData) {
        const encryptedData = {
            name: Encrypt(formData.name),
            email: Encrypt(formData.email),
            password: Encrypt(formData.password)
        };

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            if (formData.password_confirmed === formData.password) {
                API_URL.post('/users/signUp', encryptedData).then(({ data }) => {
                    const decryptedResp = Decrypt(data);
                    setIsAuth(decryptedResp.id);
                    Cookie.set('token', decryptedResp.token);
                    navigate('/');
                }).catch((err) => {
                    const errStatus = err.response.status;
                    if (errStatus === 400) { setFormErr('Данных не достаточно. Обратитесь к администратору.'); }
                    else if (errStatus === 422) { setFormErr('Данный email уже используется другим пользователем.'); }
                    else if (errStatus === 500) { setFormErr('Серверу не хорошо >_<". Попробуйте позже'); }
                    else { setFormErr(`Что-то пошло не так. Код ошибки: ${errStatus}`); }
                })
            } else {
                setError('password', { type: "empty" });
                setError('password_confirmed', { type: "match" });
            }
        } else { setError('email', { type: 'email' }); }
    }

    return (
        <div className="upPage">
            <form className='upPage__body' onSubmit={handleSubmit(onSubmit)}>
                <ValidateInput
                    textLabel={"Имя пользователя"}
                    errors={errors}
                    name={"name"}
                    formFunction={register}
                />
                <ValidateInput
                    textLabel={"E-mail"}
                    errors={errors}
                    name={"email"}
                    formFunction={register}
                />
                <ValidateInput
                    textLabel={"Пароль"}
                    errors={errors}
                    name={"password"}
                    formFunction={register}
                    type={"password"}
                />
                <ValidateInput
                    textLabel={"Подтвердите пароль"}
                    errors={errors}
                    name={"password_confirmed"}
                    formFunction={register}
                    type={"password"}
                />
                <p className='upPage__body-errorMessage'>{formErr}</p>
                <button className='upPage__body-button' disabled={!isValid}>Регистрация</button>
            </form>
            <p className='upPage-bottomText'>Уже регистрировались? <Link to={'/auth'} className='upPage-bottomText-link'>Войти</Link></p>
        </div>
    );
}