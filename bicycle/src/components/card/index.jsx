export const Card = ({imageURL, name, price}) => {
    return (
        <div className="card">
            <img src={imageURL} alt={imageURL} className="card__image"/>
            <p className="card__name">{name}</p>
            <p className="card__price">{price}</p>
        </div>
    )
}