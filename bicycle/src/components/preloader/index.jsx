import './style.scss';

export const Preloader = ({ children, isLoading }) => {
    if (isLoading) {
        return (
            <div className='preloader'>
                <svg className='preloader__svg' width="64px" height="48px">
                    <polyline className='preloader__svg-back' points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                    <polyline className='preloader__svg-front' points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
                </svg>
            </div>
        );
    } else { return (children); }
}