import React, { useState } from 'react';

import './style.scss';

/**
 * Кнопка-переключатель
 * @param {Object} props props
 * @param {string} props.name имя поля
 * @param {Function} props.formFunction функция register из useForm
 * @returns {React.JSX.Element}
 */
export const SwitchButton = ({ name, formFunction, onChange }) => {
    const [isActive, setIsActive] = useState(false);
    const handleChanges = (event) => {
        if (onChange) { onChange(event); }
        setIsActive(event.target.checked);
        formFunction(name).onChange(event);
    }

    const activeStyle = { backgroundColor: '#F57520', borderColor: '#0000' };
    const notActiveStyle = { backgroundColor: '#0000', borderColor: '#D3D3D3' };

    return (
        <label className='switchButton' htmlFor={name} style={ isActive ? activeStyle : notActiveStyle }>  
            <input className='switchButton-button' type='checkbox' id={name} {...formFunction(name)} onChange={handleChanges} />
            <label htmlFor={name} className='switchButton-label'></label>
        </label>
    );
}