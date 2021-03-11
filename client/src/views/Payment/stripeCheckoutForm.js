import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {CardElement,useStripe,useElements,} from '@stripe/react-stripe-js';
import {Button} from 'react-bootstrap'
import Alert from '../../components/Alert/alert'
import userServices from '../../services/usersAPI'
import orderServices from '../../services/ordersAPI'
const CheckoutForm = ({subtotal, items}) => {
    const [isPaying, setIsPaying] = useState(false)
    const [isError, setIsError] = useState(null)
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory()
    const clinetDetails = JSON.parse(localStorage.getItem('client_address'))
    const {user} = JSON.parse(localStorage.getItem('USER_INFO'))
    const total = () => {
        const tax = subtotal() < 1000 ? subtotal() * 0.05 : 0
        const totalAmount = Number(subtotal()) + tax + 50
        return Math.round(totalAmount * 100)
    }
    const billing_details = {
        address:{
            city:clinetDetails.city,
            country:clinetDetails.code,
            postal_code:clinetDetails.postalCode,
            line1:clinetDetails.address
        },
        email:user.email,
        name:user.name
    }
    const options ={
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placceholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
        hidePostalCode:true
      }
    const handleSubmit = async (event) => {
        setIsPaying(true)
      event.preventDefault();
      try {
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details
        });
        if(error){
            setIsError(error.message)
            setIsPaying(false)
            return
        }
        const {data:{paymentIntent}} = await userServices.pay({amount:total(),id:paymentMethod.id})
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
            email_address:paymentIntent.charges.data[0].billing_details.email,
            update_time:new Date().toLocaleString(),
            card_type:paymentIntent.charges.data[0].payment_method_details.card.brand,
            card_last4:paymentIntent.charges.data[0].payment_method_details.card.last4,
            card_exp_year:paymentIntent.charges.data[0].payment_method_details.card.exp_year
        }
        const completeOrder = {
          orderItems:cartItems,
          shippingAddress:clinetDetails,
          paymentMethod:'card',
          paymentResult,
          taxPrice:subtotal() < 1000 ? Math.round(subtotal() * 0.05) : 0,
          shippingPrice:50,
          totalPrice:total(),
          isPaid:true,
          paidAt:new Date().toLocaleString(),
          isDelivered:false
        }
        const {data:{id}} = await orderServices.create(completeOrder)
        localStorage.removeItem('CART_ITEM')
        history.push(`order/${id}`)
      } catch (error) {
        setIsError(error)
      }
        setIsPaying(false)
    };
    return (
      <form onSubmit={handleSubmit} style={{width:'100%'}} className='mt-4'>
        {isError && <Alert type='danger'>{isError}</Alert>}
        <CardElement options={options}/>
        <Button disabled={!stripe || isPaying}
            type="submit" 
            variant="dark" 
            className="mt-5"
            block 
            >{isPaying ? 'Processing...' : 'Place Your Order'}
        </Button>
      </form>
    );
  };

  export default CheckoutForm