import { Link } from "react-router-dom"

import './style.scss'

export const DivSlider = () => {
    return (
        <div className='divSlider'>
            <div className='divSlider__element-active'>
                <p className='divSlider__text'>Экстремальное<br/>вождение на горном<br/>велосипеде</p>
                <Link className='divSlider__link'>Подробнее</Link>
            </div>
            <div className='divSlider__element'>
                <p className='divSlider__text'>Велосипеды<br/>для профессионалов</p>
                <Link className='divSlider__link'>Подробнее</Link>
            </div>
            <div className='divSlider__element'>
                <p className='divSlider__text'>Долгая поездка<br/>на шоссейном велосипеде</p>
                <Link className='divSlider__link'>Подробнее</Link>
            </div>
        </div>
    )
}