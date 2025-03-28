import React, { useState } from 'react';

import './style.scss';

/**
 * Слайдер для прокрутки нескольких блоков (не карточек)
 * @param {Object} props
 * @param {React.JSX.Element[]} props.children
 * @returns {React.JSX.Element}
*/
export const DivSlider = ({ children }) => {
    const [activeSlide, setactiveSlide] = useState(0);
    setTimeout(() => {
        if (activeSlide < children.length-1) { setactiveSlide(activeSlide+1); }
        else { setactiveSlide(0); }
    }, 2000);

    return(
        <div className='divSlider'>
            {children.map((child, index) => {
                return(
                    <div className={child === children[activeSlide] ? 'divSlider__child__active' : 'divSlider__child'} key={index}>
                        { child }
                    </div>
                )
            })}
        </div>
    );
}