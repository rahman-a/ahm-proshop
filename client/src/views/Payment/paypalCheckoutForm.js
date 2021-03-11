import {useState, useEffect} from 'react'
import { PayPalButton } from "react-paypal-button-v2"
import {Button} from 'react-bootstrap'
import orderServices from '../../services/ordersAPI'
import {useHistory} from 'react-router-dom'
import Alert from '../../components/Alert/alert'

const client_id = 'AbQZVFHHYaS9puoZxLBUlPwCfErCjGF-KqrZTOmsdHZRKvYS7WWlJ6l6y_5d0V6-epACt7gGiOtW19oH'

const PaypalChekout = ({items, subtotal}) => {
  const [sdkReady, setSDKReady] = useState(false)
  const [isError, setIsError] = useState(null)
  const history = useHistory()
  const clinetDetails = JSON.parse(localStorage.getItem('client_address'))
  const total = () => {
    const tax = subtotal() < 1000 ? subtotal() * 0.05 : 0
    const totalAmount = Number(subtotal()) + tax + 50
    return Math.round(totalAmount).toFixed(2)
}
  const generatePaypalScript = () => {
    const script = document.createElement('script')
    script.id = 'payment_paypal'
    script.type = 'text/javascript'
    script.async = true
    script.src = `https://www.paypal.com/sdk/js?client-id=${client_id}&disable-funding=card,credit`
    script.onload = () => {
      setSDKReady(true)
    }
    document.body.appendChild(script)
  }

  const clearScript = () => {
    const script = document.getElementById('payment_paypal')
    document.body.removeChild(script)
  }

  useEffect(() => {
    generatePaypalScript()
    return () => clearScript()
  },[])

  const paymentHandler = async (paymentIntent) => {
    const cartItems = items.map(item => {
      return {
        product:item.id,
        name:item.name,
        qty:item.quantity,
        price:item.price,
        img:item.image
      }
    })
    const paymentResult = {
        id:paymentIntent.id,
        status:paymentIntent.status,
        email_address:paymentIntent.payer.email_address,
        update_time:paymentIntent.create_time,
    }
    const completeOrder = {
      orderItems:cartItems,
      shippingAddress:clinetDetails,
      paymentMethod:'paypal',
      paymentResult,
      taxPrice:subtotal() < 1000 ? Math.round(subtotal() * 0.05) : 0,
      shippingPrice:50,
      totalPrice:total() * 100,
      isPaid:true,
      paidAt:new Date().toLocaleString(),
      isDelivered:false
    }
    try {
        const {data:{id}} = await orderServices.create(completeOrder)
        localStorage.removeItem('CART_ITEM')
        history.push(`order/${id}`)
    } catch (error) {
      setIsError(error)
    }
  }
    return ( 
      <div>
        {isError && <Alert type='danger'>{isError}</Alert>}
        {sdkReady ? <PayPalButton 
        amount={total()}
        onSuccess={paymentHandler}
        style={{color:'black', label:'pay'}}
        />:<Button
        type="submit" 
        variant="dark" 
        className="mt-2"
        block 
        disabled
        > Wait a Second ...
    </Button>}
      </div>
     )
}
 
export default PaypalChekout;