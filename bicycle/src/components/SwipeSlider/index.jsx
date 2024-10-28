import React, { Children } from 'react';
import { useState } from 'react';

import './style.scss';
import leftArrow from '../../assets/icons/slider/leftArrow.svg';
import rightArrow from '../../assets/icons/slider/rightArrow.svg';

export const SwipeSlider = ({ children, childSize }) => {
    const [leftPosition, setLeftPosition] = useState(0);
    const numberOfChilds = Children.count(children);

    const moveToLeft = () => {
        if (leftPosition < 0) { setLeftPosition(leftPosition+childSize); }
        else { setLeftPosition(-((numberOfChilds*childSize)-childSize)); }
    }
    const moveToRight = () => {
        if (-leftPosition < (numberOfChilds*childSize)-childSize) { setLeftPosition(leftPosition-childSize); }
        else { setLeftPosition(0); }
    }
    console.log(childSize)
    return (
        <div className='swipeSlider'>
            <div className='swipeSlider__visibleSlide'>
                <div className='swipeSlider__visibleSlide__allSlides' style={{left: `${leftPosition}px`}}>
                    {children}
                </div>
                <div className='swipeSlider__visibleSlide__arrows'>
                    <div onClick={moveToLeft} id='swipeSlider_leftArrow'><img src={leftArrow} alt="left" /></div>
                    <div onClick={moveToRight} id='swipeSlider_rightArrow'><img src={rightArrow} alt="right" /></div>
                </div>
            </div>
        </div>
    );
};