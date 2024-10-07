import React from "react";
import { getTextError } from "../../helpers/validate-text/validate-text";

export const ValidateInput = ({
    initialValue = null,
    register,
    name,
    placeholder = "Введите значение",
    errors = [],
    label,
    validate = {},
}) => {
    return (
        <div style={{ marginBottom: 16 }}>
            <div>{label}</div>
            <input
                type="text"
                placeholder={placeholder}
                {...register(name, validate)}
                defaultValue={initialValue}
                style={{ minWidth: 300, borderRadius: 4, minHeight: 30, padding: 4 }}
            />
            <div style={{ color: "red" }}>
                {errors[name] && getTextError(errors[name]?.type)}
            </div>
        </div>
    );
};
