import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { API_URL } from '../../../requests/request';
import { AuthContext, AdminContext } from '../../../App';
import { ValidateInput } from '../../../components/ValidateInputs/Input';
import { Decrypt, Encrypt } from '../../../helpers/AES';

import { CheckboxButton } from '../../../components/Buttons/checkbox';

import './style.scss';

export const InPage = () => {
    const { setIsAuth } = useContext(AuthContext);
    const { setIsAdmin } = useContext(AdminContext);
    const [formErr, setFormErr] = useState('');
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm();
    const navigate = useNavigate();

    function onSubmit(submitData) {
        const encryptedSubmitData = Encrypt(submitData);

        API_URL.post('/users/signIn', {
            name: encryptedSubmitData.name,
            password: encryptedSubmitData.password,
            token: encryptedSubmitData.remembeMe
        }).then(({ data }) => {
            setFormErr('');
            const decryptedRespData = Decrypt(data);
            setIsAuth(decryptedRespData.id);
            Cookies.set('token', decryptedRespData.token, { expires: (submitData.remembeMe ? 7 : 1) });
            if (decryptedRespData.roles.includes('admin')) { setIsAdmin(true); }
            navigate('/');
        }).catch((err) => {
            const errStatus = err.response ? err.response.status : null;
            if (errStatus) {
                if (errStatus === 400) { setFormErr('Недостаточно данных для авторизации. Обратитесь к администратору'); }
                else if (errStatus === 403) { setFormErr('Отказано в доступе'); }
                else if (errStatus === 422) { setFormErr('Проверьте корректность введенных данных.'); }
                else if (errStatus === 500) { setFormErr('Серверу не хорошо >_<. Попробуйте позже.'); }
                else { setFormErr(`Что-то пошло не так. Код ошибки: ${errStatus}`); }
            } else {
                console.log(err);
            }
        });
    }

    return (
        <div className="authPage">
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