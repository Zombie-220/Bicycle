import { useState, useRef, useEffect } from 'react';

import './style.scss';

export const LoopSlider = ({ children }) => {
    const [margin, setMargin] = useState(0);
    const [slideSize, setSlideSize] = useState({ width: 0, height: 0 });
    const slideRef = useRef(null);

    setTimeout(() => {
        if (margin <= -slideSize.width) { setMargin(1); }
        else { setMargin(margin - 1); }
    }, 20);

    useEffect(() => {
        const size = slideRef.current.getBoundingClientRect()
        setSlideSize({ width: size.width, height: size.height });
        console.log(size);
    }, [slideRef])

    return(
        <div className='loopSlider'>
            <div className='loopSlider__firstSlide' style={{marginLeft: `${margin}px`}} ref={slideRef}>
                { children }
            </div>
            <div className='loopSlider__secondSlide'> { children } </div>
        </div>
    );
}