import './style.scss';

export const AdminOrderCard = ({ totalCost, orderInfo, time, user }) => {
    return(
        <div className='adminOrderCard'>
            {totalCost}
            {/* {orderInfo} */}
            {time}
            {user}
            {orderInfo.map((data, index) => {
                return(
                    <div>
                        {
                            data.id
                        }
                        {
                            data.pricePerPiece
                        }
                        {
                            data.amount
                        }
                        {
                            data.size
                        }
                    </div>
                )
            })}
        </div>
    )
}