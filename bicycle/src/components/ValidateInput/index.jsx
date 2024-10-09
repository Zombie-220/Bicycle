import React from "react";
import { getTextError } from "../../helpers/validate-text/validate-text";

import "./style.scss";

export const ValidateInput = ({
    register,
    name,
    errors = [],
    textLabel,
    validate = {},
    type="text",
    changeValue
}) => {
    return (
        <div className="validateInput">
            <div className="validateInput__text">{textLabel}</div>
            <input className={errors[name] ? "validateInput__input input_error" : "validateInput__input"}
                type={type}
                {...register(name, validate)} onChange={changeValue}/>
            <div className="validateInput__error">
                {errors[name] && getTextError(errors[name]?.type)}
            </div>
        </div>
    );
};
