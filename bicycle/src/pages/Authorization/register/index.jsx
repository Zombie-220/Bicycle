import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { ValidateInput } from '../../../components/ValidateInputs/Input';
import { API_URL } from '../../../requests/request';
import { AuthContext } from '../../../App';
import { Decrypt, Encrypt } from '../../../helpers/AES';

import './style.scss';

export const RegisterPage = () => {
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
                API_URL.get(`/users/check?name=${encryptedData.name}`).then(({ data }) => {
                    if (!data.id) {
                        API_URL.post('/users/register', {
                            name: encryptedData.name,
                            password: encryptedData.password,
                            email: encryptedData.email
                        }).then((respData) => {
                            setIsAuth(Decrypt(respData.data.id));
                            navigate('/');
                        }).catch(() => { setFormErr('Сайту не хорошо @_@. Попробуйте позже.') });
                    } else { setError('name', { type: 'reserved' }); }
                }).catch(() => { setFormErr('Сайту не хорошо @_@. Попробуйте позже.') });
            } else {
                setError('password', { type: "empty" });
                setError('password_confirmed', { type: "match" });
            }
        } else { setError('email', { type: 'email' }); }
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