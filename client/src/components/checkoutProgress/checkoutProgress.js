
const CheckoutSteps = ({step}) => {
    return ( 
        <div className="progress">
            <ul className='progress__list'>
                <li className={['progress__item',step <= 3 &&  'progress__item-active'].join(' ')}>Shipping Address</li>
                <li className={['progress__item',step >= 2 &&  'progress__item-active'].join(' ')}>Payment Methods</li>
                <li className={['progress__item',step === 3 &&  'progress__item-active'].join(' ')}>Order Placed</li>
            </ul>
        </div>
     );
}
 
export default CheckoutSteps;