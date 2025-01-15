import { useState } from 'react';

import './style.scss';

export const CheckboxButton = ({ name, formFunction, checked=null, onChange=null }) => {
    const [isActive, setIsActive] = useState(false);
    const handleChanges = (event) => {
        if (onChange) { onChange(); }
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