import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { API_URL } from '../../../requests/request';
import { Decrypt } from '../../../helpers/AES';

import { ValidateInput } from '../../../components/ValidateInputs/Input';

import './style.scss';
import { useState } from 'react';

export const RecoverPass = () => {
    const {register, handleSubmit, formState: {errors, isValid} } = useForm();
    const [formMessage, setFormMessage] = useState('');
    const { id } = useParams();

    const changePass = (formData) => {
        if (formData.newPass === formData.newPassAgain) {
            API_URL.get(`/users/info/${id}`).then((innerData) => {
                API_URL.post('/users/changePassword', {
                    newPass: formData.newPass,
                    email: innerData.data.email
                }).then(({data}) => {
                    setFormMessage('Пароль успешно изменен');
                }).catch((err) => { console.log(err); });
            }).catch((err) => { console.log(err); })
        } else { setFormMessage('Пароли не совпадают'); }
    }

    return (
        <div className="recoverPass">
            <p className='recoverPass-header'>сменить пароль</p>
            <form onSubmit={handleSubmit(changePass)}>
                <ValidateInput
                    formFunction={register}
                    errors={errors}
                    name='oldPass'
                    textLabel='Старый пароль'
                    type='password'
                />
                <ValidateInput
                    formFunction={register}
                    errors={errors}
                    name='newPass'
                    textLabel='Новый пароль'
                    type='password'
                />
                <ValidateInput
                    formFunction={register}
                    errors={errors}
                    name='newPassAgain'
                    textLabel='Повторите новый пароль'
                    type='password'
                />
                <button className='recoverPass-button' disabled={!isValid}>Изменить</button>
                <p>{formMessage}</p>
            </form>
        </div>
    );
}