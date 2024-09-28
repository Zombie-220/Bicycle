import React from "react";
import { Register } from "../../pages/register/register";

export const TextInput = ({
    initValue = null,
    register,
    name,
    placeholder = "Введите значение",
    errors = [],
    label,
    validate = [],
}) => {
    return (
        <div>
            <div>{label}</div>
            <input type="text" placeholder={placeholder}{...register(name, validate)} defaultValue={initValue} style={{minWidth: 300, borderRadius: 4, minHeight: 30, padding: 4}}/>
            <div style={{color: "red"}}>
                {errors[name] && getTextError(errors[name]?.type)}
            </div>
        </div>
    );
};