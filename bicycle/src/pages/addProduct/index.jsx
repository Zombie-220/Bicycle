import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { ChangeProductContext } from "../../App";
import { baseURL } from "../../requests/request";
import { ValidateInput } from "../../components/ValidateInput";

import './style.scss';

export const AddProduct = () => {
    const { changedProduct, setChangedProduct } = useContext(ChangeProductContext);
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    function onSubmit(data) {
        baseURL.post('/products/add', {
            name: data.name,
            productImage: data.productImage,
            countryImage: data.countryImage,
            price: data.price,
            amount: data.amount
        }).then(resp => {}).catch((err) => {console.log(err)})
        reset();
    }

    return (
        <div className="addPage">
            <div className='order__heeaderBackground'></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ValidateInput
                    textLabel={"Наименование"}
                    errors={errors}
                    name={"name"}
                    formFunction={register}
                    validate={{ required: true }}
                    type={"text"}
                    styles={{ width: '96%', height: '20px' }}
                />
                <ValidateInput
                    textLabel={"Изображение"}
                    errors={errors}
                    name={"productImage"}
                    formFunction={register}
                    validate={{ required: true }}
                    type={"text"}
                    styles={{ width: '96%', height: '20px' }}
                />
                <ValidateInput
                    textLabel={"Страна-изготовитель"}
                    errors={errors}
                    name={"countryImage"}
                    formFunction={register}
                    validate={{ required: true }}
                    type={"text"}
                    styles={{ width: '96%', height: '20px' }}
                />
                <ValidateInput
                    textLabel={"Цена"}
                    errors={errors}
                    name={"price"}
                    formFunction={register}
                    validate={{ required: true }}
                    type={"number"}
                    styles={{ width: '96%', height: '20px' }}
                />
                <ValidateInput
                    textLabel={"Количество"}
                    errors={errors}
                    name={"amount"}
                    formFunction={register}
                    validate={{ required: true }}
                    type={"number"}
                    styles={{ width: '96%', height: '20px' }}
                />
                <button className="addPage-button" disabled={!isValid}>Добавить</button>
                <Link to="/admin" className="addPage-link">Назад</Link>
            </form>
        </div>
    );
}