import React, { useState } from 'react';

import './style.scss';

/**
 * Обычная кнопка с галочкой
 * @param {Object} props props
 * @param {string} props.name имя поля
 * @param {Function} props.formFunction функция register из useForm
 * @param {boolean} props.checked переменная, которая показывает, активна ли кнопка сейчас
 * @param {Function} props.onChange функция, применяемая при смене значения
 * @returns {React.JSX.Element}
*/
export const CheckboxButton = ({ name, formFunction, checked=null, onChange=null }) => {
    const [isActive, setIsActive] = useState(false);
    const handleChanges = (event) => {
        if (onChange) { onChange(event); }
        setIsActive(event.target.checked);
        formFunction(name).onChange(event);
    }

    const activeStyle = { backgroundColor: '#F57520', borderColor: '#0000' };
    const notActiveStyle = { backgroundColor: '#0000', borderColor: '#777' };

    return (
        <label className='checkboxButton' htmlFor={name} style={(isActive ? activeStyle : notActiveStyle)}>
            <input className='checkboxButton-input' type="checkbox" id={name} {...formFunction(name)} onChange={handleChanges} checked={checked} />
            <span className='checkboxButton-checkmark'></span>
        </label>
    );
}