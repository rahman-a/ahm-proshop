import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import orderServices from '../../services/ordersAPI'
import Alert from '../../components/Alert/alert'

const COD = ({subtotal, items}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    const history = useHistory()
    const clinetDetails = JSON.parse(localStorage.getItem('client_address'))
    const total = () => {
      const tax = subtotal() < 1000 ? subtotal() * 0.05 : 0
      const totalAmount = Number(subtotal()) + tax + 50
      return Math.round(totalAmount).toFixed(2)
  }
    const placeOrderHandler = async () => {
        setIsLoading(true)
        const cartItems = items.map(item => {
            return {
              product:item.id,
              name:item.name,
              qty:item.quantity,
              price:item.price,
              img:item.image
            }
          })
          const completeOrder = {
            orderItems:cartItems,
            shippingAddress:clinetDetails,
            paymentMethod:'cod',
            taxPrice:subtotal() < 1000 ? Math.round(subtotal() * 0.05) : 0,
            shippingPrice:50,
            totalPrice:total() * 100,
            isPaid:false,
            isDelivered:false
          }
          try {
            const {data:{id}} = await orderServices.create(completeOrder)
            localStorage.removeItem('CART_ITEM')
            history.push(`order/${id}`)
          } catch (error) {
            setIsError(error.response && error.response.data.message)
          }
          setIsLoading(false)
    }
    return ( 
      <>
        {isError && <Alert type='danger'>{isError}</Alert>}
        <Card>
            <Card.Body>
                Please note there is a non-refundable fee of $25.00 for our cash on delivery service.
                To save on this amount, please <span style={{fontWeight:'bold'}}>proceed with debit/credit card or Paypal.</span>
            </Card.Body>
            <Button
                type="submit" 
                variant="dark" 
                className="mt-2"
                block 
                onClick={placeOrderHandler}
                disabled={isLoading}
                > {isLoading ? 'Processing...' : 'Place Your Order'}
            </Button>
        </Card>
      </>
     );
}
 
export default COD;