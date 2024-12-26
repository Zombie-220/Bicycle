import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { ValidateInput } from "../../../components/ValidateInput";
import { API_URL } from '../../../requests/request'; 

import './style.scss';

export const RecoverPasswordPage = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();
    const [formErr, setFormErr] = useState('');

    function onSubmit(formData) {
        API_URL(`/users/recover/${formData.name}`).then(({ data }) => {
            console.log(data);
            if (!data.response) { setFormErr('Пользователь не найден'); }
            else { setFormErr("сделай уже отправку на почту, ленивая ты жопа"); }
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
                    validate={{ required: true }}
                />
                <p className='recoverPasswordPage__body-errorMessage'>{formErr}</p>
                <button className='recoverPasswordPage__body-button' disabled={!isValid}>Сброс пароля</button>
            </form>
        </div>
    );
}