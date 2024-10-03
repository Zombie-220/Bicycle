import { Link } from "react-router-dom"

export const DivSlider = () => {
    return (
        <div className='main__slider'>
            <div className='main__slider__element'>
                <p className='main__slider__text'>Экстремальное<br/>вождение на горном<br/>велосипеде</p>
                <Link className='main__slider__link'>Подробнее</Link>
            </div>
            <div className='main__slider__element'>
                <p className='main__slider__text'>Велосипеды<br/>для профессионалов</p>
                <Link className='main__slider__link'>Подробнее</Link>
            </div>
            <div className='main__slider__element'>
                <p className='main__slider__text'>Долгая поездка<br/>на шоссейном велосипеде</p>
                <Link className='main__slider__link'>Подробнее</Link>
            </div>
        </div>
    )
}