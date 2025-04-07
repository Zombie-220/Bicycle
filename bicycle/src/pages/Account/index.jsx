import { Link, Outlet, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { ValidateInput } from '../../components/ValidateInputs/Input';
import { API_URL } from '../../requests/request';

import './style.scss';

export const AccountPage = () => {
    const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm();
    const [lastUrlPath, setLastUrlPath] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const { id } = useParams();

    const changeProfileData = (formData) => {
        API_URL.post('/users/changeName', {
            newName: formData.name,
            email: userEmail
        }).then(({data}) => {
            console.log(data);
        }).catch((err) => { console.log(err); });
    }

    useEffect(() => {
        API_URL.get(`/users/info/${id}`).then(({data}) => {
            setValue('name', data.username);
            setUserEmail(data.email);
        }).catch((err) => { console.log(err); });
    }, []);

    useEffect(() => {
        const fullUrl = window.location.href.split('/');
        setLastUrlPath(fullUrl[fullUrl.length-1]);
    }, [window.location.href]);
    
    return (
        <div className="accountPage">
            <div className='accountPage__leftSide'>
                <p className='accountPage__leftSide-header'>Мой аккаунт</p>
                <Link className={`accountPage__leftSide-link ${lastUrlPath==id && 'activeAccountPageLink'}`} to={`/account/${id}`}>Персональные данные</Link>
                <Link className={`accountPage__leftSide-link ${lastUrlPath=='password' && 'activeAccountPageLink'}`} to={`/account/${id}/password`}>Смена пароля</Link>
            </div>
            <div className='accountPage__rightSide'>
                {lastUrlPath === id ?
                    <form onSubmit={handleSubmit(changeProfileData)} className='accountPage__rightSide__personalData'>
                        <p className='accountPage__rightSide__personalData-header'>Персональные данные</p>
                        <div className='accountPage__rightSide__personalData__inputs'>
                            <ValidateInput
                                name={'name'}
                                errors={errors}
                                textLabel={'Имя пользователя'}
                                type={'text'}
                                formFunction={register}
                            />
                        </div>
                        <div className='accountPage__rightSide__personalData__inputs'>
                           <p className='accountPage__rightSide__personalData__inputs-text'>E-mail пользователя: {userEmail}</p>
                        </div>
                        <button className='accountPage__rightSide__personalData-button' disabled={!isValid}>Изменить</button>
                    </form>
                    :
                    <Outlet />
                }
            </div>
        </div>
    );
}