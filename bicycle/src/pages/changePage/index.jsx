import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { ChangeProductContext } from "../../App";
import { baseURL } from "../../requests/request";
import { ValidateInput } from "../../components/ValidateInput";

import './style.scss';

export const ChangePage = () => {
    const { changedProduct, setChangedProduct } = useContext(ChangeProductContext);
    const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        baseURL.get(`/products/byID/${changedProduct}`).then(resp => {
            setProduct(resp.data);
            setValue('name', resp.data.name);
            setValue('productImage', resp.data.productImage);
            setValue('countryImage', resp.data.countryImage);
            setValue('price', resp.data.price);
            setValue('amount', resp.data.amount);
        }).catch(err => { console.log(err); })
    }, [changedProduct, setChangedProduct]);

    function onSubmit(data) {
        baseURL.post('/products/change', {
            _id: product._id,
            name: data.name,
            productImage: data.productImage,
            countryImage: data.countryImage,
            price: data.price,
            amount: data.amount
        }).then(resp => {}).catch((err) => {console.log(err)})
        navigate('/admin');
    }

    return (
        <div className="changePage">
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
                <button className="changePage-button" disabled={!isValid}>Изменить</button>
                <Link to="/admin" className="changePage-link">Назад</Link>
            </form>
        </div>
    );
}