import { useForm } from 'react-hook-form';

import { ValidateInput } from '../../../components/ValidateInputs/Input';

import './style.scss';

export const RecoverPass = () => {
    const {register, handleSubmit, formState: {errors, isValid} } = useForm();

    const changePass = (formData) => {
        console.log(formData)
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
            </form>
        </div>
    );
}