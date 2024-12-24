import React from "react";

import "./style.scss";

const getTextError = (type) => {
    switch (type) {
        case "required": return "Поле обязательное для заполнения";
        default: return `${type} - ошибка`;
    }
};

export const ValidateInput = ({ formFunction, name, errors = [], textLabel, validate = {}, type="text" }) => {
    return (
        <div className="validateInput">
            <div className="validateInput__text">{textLabel}</div>
            <input className={errors[name] ? "validateInput__input input_error" : "validateInput__input"}
                type={type} {...formFunction(name, validate)}/>
            <div className="validateInput__error">
                {errors[name] && getTextError(errors[name]?.type)}
            </div>
        </div>
    );
};
