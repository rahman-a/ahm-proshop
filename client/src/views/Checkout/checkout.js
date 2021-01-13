import {useState} from 'react'
import Shipping from '../../components/Shipping/shipping'
import Payment from '../../components/Payment/payment'
import Order from '../../components/Order/order'

const Checkout = (props) => {
    const [step, setStep] = useState('shipping')

    const stepChangeHandler = name => setStep(name)
    return ( 
       <div className="checkout">
           {step === 'shipping' && <Shipping stepChange = {stepChangeHandler}/>}
           {step === 'payment' && <Payment stepChange = {stepChangeHandler}/>}
           {step === 'order' && <Order />}
       </div>
     );
}
 
export default Checkout;