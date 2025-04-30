import './style.scss';

// import messageImg from '../../assets/images/message.svg';
import successImg from '../../assets/images/success.svg';
import errorImg from '../../assets/images/error.svg';

export const ModalPopup = ({ children, isShow, setIsShow, type='message' }) => {
    const typeColors = {
        'message': '#FFF',
        'success': '#84D65A',
        'error': '#FF4646'
    }
    const typeImg = {
        // 'message': messageImg,
        'success': successImg,
        'error': errorImg
    }

    return(
        <div className='popup' style={{top: `${isShow ? '20px' : '-100px'}`, backgroundColor: typeColors[type]}}>
            <div className='popup__container'>
                <button className='popup__container-closeBtn' onClick={() => { setIsShow(false); }}>
                    <div></div>
                    <div></div>
                </button>
                <img src={typeImg[type]} alt={`img-${type}`} />
                {children}
            </div>
        </div>
    );
}