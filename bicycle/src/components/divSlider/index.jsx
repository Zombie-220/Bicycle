import { Link } from "react-router-dom"
import { useState } from "react"

import './style.scss'

export const DivSlider = () => {
    const [dynamicClass1, setDynamicClass1] = useState('active')
    const [dynamicClass2, setDynamicClass2] = useState('')
    const [dynamicClass3, setDynamicClass3] = useState('')

    setTimeout(() => {
        if ( dynamicClass1 === 'active' ) {
            setDynamicClass2('active')
            setDynamicClass1('');
        } else if ( dynamicClass2 === 'active' ) {
            setDynamicClass3('active')
            setDynamicClass2('');
        } else if ( dynamicClass3 === 'active' ) {
            setDynamicClass1('active')
            setDynamicClass3('')
        }
    }, 3000);

    return (
        <div className='divSlider'>
            <div className={`divSlider__element ${dynamicClass1}`}>
                <p className='divSlider__text'>Экстремальное<br/>вождение на горном<br/>велосипеде</p>
                <Link className='divSlider__link'>Подробнее</Link>
            </div>
            <div className={`divSlider__element ${dynamicClass2}`}>
                <p className='divSlider__text'>Велосипеды<br/>для профессионалов</p>
                <Link className='divSlider__link'>Подробнее</Link>
            </div>
            <div className={`divSlider__element ${dynamicClass3}`}>
                <p className='divSlider__text'>Долгая поездка<br/>на шоссейном велосипеде</p>
                <Link className='divSlider__link'>Подробнее</Link>
            </div>
        </div>
    )
}