import React from "react";

import "./Input.scss";

const getTextError = (type) => {
    switch (type) {
        case "required": return "Поле обязательное для заполнения";
        case "reserved": return "Данное имя уже занято";
        case "match": return "Поля не совпадают";
        case "empty": return "";
        case "incorrect": return "Введены неверные данные";
        case "email": return "Почта введена не корректно";
        default: return `${type} - ошибка`;
    }
};

/**
 * Input для валидации введеных строчных данных
 * @param {Object} props
 * @param {Function} props.formFunction функция register из formFunction
 * @param {string} props.name имя поля
 * @param {[]} props.errors formState: { error } из formFunction
 * @param {string} props.textLabel название поля для пользователя
 * @param {Object} props.validate валидность поля
 * @param {string} props.type тип поля
 * @returns {React.JSX.Element}
*/
export const ValidateInput = ({ formFunction, name, errors = [], textLabel, validate={ required: true }, type="text" }) => {
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
