import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { ValidateInput } from "../../../components/ValidateInputs/Input";
import { API_URL } from '../../../requests/request';
import { Decrypt, Encrypt } from "../../../helpers/AES";

import './style.scss';

export const RecoverPasswordPage = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();
    const [formErr, setFormErr] = useState('');
    const [formMessage, setFormMessage] = useState('');

    function onSubmit(formData) {
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

    return (
        <div className="recoverPasswordPage">
            <p className="recoverPasswordPage-header">Забыли пароль?</p>
            <p className="recoverPasswordPage-text">Укажите имя пользователя. Сообщение с сылкой для сброса пароля придёт на привязанную к этому имени почту.</p>
            <form className='recoverPasswordPage__body' onSubmit={handleSubmit(onSubmit)}>
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