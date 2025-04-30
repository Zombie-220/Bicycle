import { useState } from 'react';

import './style.scss';

export const ModalWindow = ({ children, isOpen, setIsOpen }) => {
    return (
        <div className="modalBlackout" style={isOpen ? {height: '100%'} : {height: '0%'}}>
            <div className="modalBlackout__window" style={isOpen ? {opacity: '100%'} : {opacity: '0%'}}>
                <button className='modalBlackout__window-button' onClick={() => { setIsOpen(false) }}>
                    <div></div>
                    <div></div>
                </button>
                <div className='modalBlackout__window__child'>
                    { children }
                </div>
            </div>
        </div>
    );
}