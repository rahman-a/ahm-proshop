import {useState} from 'react'
import CheckoutProgress from '../../components/checkoutProgress/checkoutProgress'
import {Row, Col} from 'react-bootstrap'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import StripeCheckoutForm from './stripeCheckoutForm'
import PaypalCheckoutForm from './paypalCheckoutForm'
import COD from './codCheckout'
import {useCartState} from '../../store/cartStore/cart'
import PaymentOption from './paymentOptions'
import OrderSummery from './orderSummery'
import OrderItems from './orderItems'

const stripePromise = loadStripe('pk_test_51I9GWmDjuOpFkEAYChkWECHiOfAXCC5D8y8JJzP5rNo35vLSz3ksCqrNaUnzq0n7QceTFbA7oa1TCvbIFGPcnfjn009XTRojCr')

const Payment = () => {
    const items = useCartState()
    const [payment, setPayment] = useState('card')

    const calcSubTotal = () => {
        const total = items.reduce((acc, item) => acc + (item.quantity * item.price),0)
        return total.toFixed(2)
    }

    return ( 
        <div className="payment">
            <CheckoutProgress step={2}/>
            <Row>
                <Col md={7}>
                    <h5>Choose Your Payment Method</h5>
                    <PaymentOption setPaymentOption={setPayment}/>
                    {payment === 'paypal' &&
                    <PaypalCheckoutForm items={items} subtotal={calcSubTotal}/>
                    }
                    {payment === 'cod' && <COD items={items} subtotal={calcSubTotal}/>}
                    
                    {payment === 'card' &&
                    <Elements stripe={stripePromise}>
                        <StripeCheckoutForm subtotal={calcSubTotal} items={items}/>
                    </Elements>}
                    <p style={{backgroundColor:'#eee', height:'1px', margin:'1rem 0'}}></p>
                    <OrderItems items={items} />
                </Col>
                <Col md={5}>
                    <OrderSummery 
                    subtotal={calcSubTotal}
                    payment={payment}
                   />
                </Col>
            </Row>
        </div>
     );
}
 
export default Payment;