import './style.scss';

export const Preloader = ({ children, isLoading }) => {
    if (isLoading) {
        return(
            <div className="preloader">
                <p>Loading...</p>
            </div>
        );
    };
    return(children);
}