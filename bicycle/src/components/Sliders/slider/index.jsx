import { useState } from 'react';

import './style.scss';

/**
 * Слайдер для показа карточек
 * @param {Object} props
 * @param {React.JSX.Element[]} props.children
 * @param {number} props.cardPerSlide количество карточек за слайд
 * @returns {React.JSX.Element}
*/
export const Slider = ({ children, cardPerSlide }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        if (currentIndex >= children.length-cardPerSlide) { setCurrentIndex(0); }
        else { setCurrentIndex((prevIndex) => (prevIndex + cardPerSlide)); }
    };

    const prevSlide = () => {
        if (currentIndex <= 0) { setCurrentIndex(children.length-cardPerSlide); }
        else { setCurrentIndex((prevIndex) => (prevIndex - cardPerSlide)); }
    };

    return (
        <div className="slider">
            <div className="slider__items" style={{ transform: `translateX(-${currentIndex * (100 / cardPerSlide)}%)` }}>
                {children.map((child, index) => {
                    return (
                        <div className="slider__items-item" style={{flex: `0 0 ${100 / cardPerSlide}%`, width: `${100 / cardPerSlide}%`}} key={index}>
                            <div className='slider__items-item-wrapper'>
                                { child }
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="slider-button" id="leftSliderButton" onClick={prevSlide} style={{display: children.length-cardPerSlide === 0? 'none' : 'flex'}}>
                <svg width="16" height="16" viewBox="0 0 10 20">
                    <path className='slider-button-arrow' d="M2.8752 19.1L11.3002 10.7C11.4002 10.6 11.4709 10.4917 11.5122 10.375C11.5542 10.2584 11.5752 10.1334 11.5752 10C11.5752 9.86669 11.5542 9.74169 11.5122 9.62502C11.4709 9.50836 11.4002 9.40002 11.3002 9.30002L2.8752 0.875024C2.64186 0.641691 2.3502 0.525024 2.0002 0.525024C1.6502 0.525024 1.3502 0.650024 1.1002 0.900024C0.850196 1.15002 0.725196 1.44169 0.725196 1.77502C0.725196 2.10836 0.850196 2.40002 1.1002 2.65002L8.4502 10L1.1002 17.35C0.866862 17.5834 0.750196 17.8707 0.750196 18.212C0.750196 18.554 0.875196 18.85 1.1252 19.1C1.3752 19.35 1.66686 19.475 2.0002 19.475C2.33353 19.475 2.6252 19.35 2.8752 19.1Z"/>
                </svg>
            </button>
            <button className="slider-button" id="rightSliderButton" onClick={nextSlide} style={{display: children.length-cardPerSlide === 0? 'none' : 'flex'}}>
                <svg width="16" height="16" viewBox="0 0 10 20">
                    <path className='slider-button-arrow' d="M2.8752 19.1L11.3002 10.7C11.4002 10.6 11.4709 10.4917 11.5122 10.375C11.5542 10.2584 11.5752 10.1334 11.5752 10C11.5752 9.86669 11.5542 9.74169 11.5122 9.62502C11.4709 9.50836 11.4002 9.40002 11.3002 9.30002L2.8752 0.875024C2.64186 0.641691 2.3502 0.525024 2.0002 0.525024C1.6502 0.525024 1.3502 0.650024 1.1002 0.900024C0.850196 1.15002 0.725196 1.44169 0.725196 1.77502C0.725196 2.10836 0.850196 2.40002 1.1002 2.65002L8.4502 10L1.1002 17.35C0.866862 17.5834 0.750196 17.8707 0.750196 18.212C0.750196 18.554 0.875196 18.85 1.1252 19.1C1.3752 19.35 1.66686 19.475 2.0002 19.475C2.33353 19.475 2.6252 19.35 2.8752 19.1Z"/>
                </svg>
            </button>
        </div>
    );
};
