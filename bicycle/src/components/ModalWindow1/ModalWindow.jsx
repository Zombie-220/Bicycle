import { Transition } from 'react-transition-group';

import './modalWindow.scss';

export const ModalWindow = ({ isOpen, onClose, children }) => {
    const onWrapperClick = (event) => { if (event.target.classList.contains("modal__wrapper")) { onClose() } }

    return (
        <Transition in={isOpen} timeout={350} unmountOnExit={true}>
            { (state) => 
                (<div className={`modal modal--${state}`}>
                <div className="modal__wrapper" onClick={onWrapperClick}>
                    <div className="modal__wrapper__content">
                        <button className="modal__wrapper__content__closeButton" onClick={()=>onClose()}>X</button>
                        {children}
                    </div>
                </div>
            </div>)}
        </Transition>
    );
};