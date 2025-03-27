import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

import { ValidateInput } from "../../../components/ValidateInputs/Input";
import { API_URL } from '../../../requests/request';
import { Decrypt, Encrypt } from "../../../helpers/AES";

import './style.scss';

export const RecoverPasswordPage = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();
    const [formErr, setFormErr] = useState('');
    const [formMessage, setFormMessage] = useState('');
    const query = new URLSearchParams(useLocation().search);
    const email = query.get('email') ? query.get('email').replaceAll(' ', '+') : null;
    const token = query.get('token') ? query.get('token') : null;

    function createRecoverToken(formData) {
        API_URL.post(`/users/recover`, {
            login: Encrypt(formData.name)
        }).then(({ data }) => {
            const respData = Decrypt(data).response;
            console.log(respData);
            if (respData == 'user not found') {
                setFormErr('Данный пользователь не найден.');
                setFormMessage('');
            }
            else if (respData == 'go next') {
                setFormErr('');
                setFormMessage('Письмо с сылкой на восстановление пароля вскоре должно прийти к Вам на почту.');
            }
        }).catch(() => { setFormErr('Сайту не хорошо @_@. Попробуйте позже.'); })
    }

    function changePassword(formData) {
        API_URL.post('/users/changePassword', {
            newPass: formData.password,
            email: Decrypt(email)
        }).then(({data}) => {
            console.log(Decrypt(data));
        }).catch((err) => { console.log(err); })
    }

    useEffect(() => {
        if (email && token ) {
            console.log(Decrypt(email), jwtDecode(token));
            console.log(new Date(jwtDecode(token).exp*1000));
        }
    }, [email, token]);

    return (
        (email && token) ?
        <div className="recoverPasswordPage">
            <p className="recoverPasswordPage-header">Создание пароля</p>
            <p className="recoverPasswordPage-text">Придумайте новый пароль</p>
            <form className='recoverPasswordPage__body' onSubmit={handleSubmit(changePassword)}>
                <ValidateInput
                    textLabel={"Новый пароль"}
                    errors={errors}
                    name={"password"}
                    formFunction={register}
                />
                <ValidateInput
                    textLabel={"Подтвердите новый пароль"}
                    errors={errors}
                    name={"password_again"}
                    formFunction={register}
                />
                <p className='recoverPasswordPage__body-errorMessage'>{formErr}</p>
                <button className='recoverPasswordPage__body-button' disabled={!isValid}>Сохранить пароля </button>
                <p className="recoverPasswordPage__body-message">{formMessage}</p>
            </form>
        </div>
        :
        <div className="recoverPasswordPage">
            <p className="recoverPasswordPage-header">Забыли пароль?</p>
            <p className="recoverPasswordPage-text">Укажите имя пользователя. Сообщение с сылкой для сброса пароля придёт на привязанную к этому имени почту.</p>
            <form className='recoverPasswordPage__body' onSubmit={handleSubmit(createRecoverToken)}>
                <ValidateInput
                    textLabel={"Имя пользователя"}
                    errors={errors}
                    name={"name"}
                    formFunction={register}
                />
                <p className='recoverPasswordPage__body-errorMessage'>{formErr}</p>
                <button className='recoverPasswordPage__body-button' disabled={!isValid}>Сброс пароля</button>
                <p className="recoverPasswordPage__body-message">{formMessage}</p>
            </form>
        </div>
    );
}