export const TestInput = ({text, type='text', minLength=null, maxLength=524288}) => {
    return (
        <div className="testInput">
            <p className="testInput-text">{text}</p>
            <input type={type} minLength={minLength} maxLength={maxLength}/>
            <p className="testInput-error"></p>
        </div>
    );
}