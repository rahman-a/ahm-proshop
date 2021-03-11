import {useEffect,useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useLoginstate} from '../../store/userStore/login'
import {Button} from 'react-bootstrap'
import CheckoutProgress from '../../components/checkoutProgress/checkoutProgress'
import OrderSummery from '../Payment/orderSummery'
import {Row, Col} from 'react-bootstrap'
import {useOrderState, useOrderDispatch} from '../../store/orderStore/order'
import {getOrderById} from '../../store/orderStore/actions'
import OrderItems from '../Payment/orderItems'
import Alert from '../../components/Alert/alert'
import Loading from '../../components/Loading/loading'
import orderServices from '../../services/ordersAPI'
import {message} from 'antd'

const Order = (props) => {
   const dispatch = useOrderDispatch()
   const {order, loading, error} = useOrderState()
   const {id} = useParams()
   const history = useHistory()
   const {user:{user}} = useLoginstate()
   const [isDelivered, setIsDelivered] = useState(false)

   const calcSubTotal = () => {
      const total = order.orderItems.reduce((acc, item) => acc + (item.qty * item.price),0)
      return total.toFixed(2)
  }

  const markedAsDelivered = async(id) => {
     const {data:{message:done}} = await orderServices.Delivered(id)
     message.success(done)
     setIsDelivered(true)
  }
  
   useEffect(() => {
      getOrderById(dispatch,id)
   },[dispatch, id,isDelivered])
         let paymentMethod;
         if(order){
            if(order.paymentMethod === 'cod'){
               paymentMethod = <h6>Cash on Delivery</h6>
            }else if(order.paymentMethod === 'paypal') {
               paymentMethod = (
                  <>
                  <p><i className="fab fa-cc-paypal" style={{color:'#0061aa', fontSize:'3rem'}}></i></p>
                  <p>{order.paymentResult.email_address}</p>
                  </>
               )
            }else {
               if(order.paymentResult) {
                  if(order.paymentResult.card_type === 'visa'){
                     paymentMethod = (
                        <p><i class="fab fa-cc-visa" style={{color:'#0404a2', fontSize:'1rem'}}></i> ********{order.paymentResult.card_last4}</p>
                     )
                  }else if(order.paymentResult.card_type === "mastercard"){
                     paymentMethod = (
                        <p><i class="fab fa-cc-mastercard" style={{color:'#981818', fontSize:'1rem'}}></i> ********{order.paymentResult.card_last4}</p>
                     )
                  }else{
                     paymentMethod = (
                        <p><i class="fas fa-credit-card" style={{color:'#067688', fontSize:'1rem'}}></i> ********{order.paymentResult.card_last4}</p>
                     )
                  } 
               } 
            }
         }
        
     return (
      <> 
      {loading ? <Loading /> : error ? <Alert type='danger'>{error}</Alert>: order && <div className="order">
            <CheckoutProgress step={3}/>
            <div style={{textAlign:'center'}} className='mb-5'>
               <i className="fas fa-check-circle" style={{color:'green', fontSize:'5rem'}}></i>
               <h2 className="mt-4"> 
                  {user.isAdmin ? 'The Order Details':'Thank you for your Order'}
               </h2>
               <h4 className='text-muted'>Order No: {order._id}</h4>
               <p>confirmation e-mail has been sent to : <span style={{fontWeight:'bold'}}>{order.user.email}</span></p>
            </div>
            <Row> 
            <Col md={7}>
               <p>Name: {order.user.name}</p>
               <p>E-mail: {order.user.email}</p>
               <p>Shipping to:</p>
               <p style={{fontWeight:'bold'}}>{`${order.shippingAddress.address}-${order.shippingAddress.city}-${order.shippingAddress.country}`}</p>
               <p style={{backgroundColor:'#eee', height:'1px', margin:'1rem 0'}}></p>
               <p>Payment Method:</p>
               <div>{paymentMethod}</div>
               <p style={{backgroundColor:'#eee', height:'1px', margin:'1rem 0'}}></p>
               <p>Delivery Status:</p>
               <div>{order.isDelivered 
               ? <h6 style={{color:'#0d6707'}}>Delivered</h6>
               : <h6 style={{color:'#8c0202'}}>Not Delivered</h6>}</div>
               

               <p style={{backgroundColor:'#eee', height:'1px', margin:'2rem 0'}}></p>
               <OrderItems  items={order.orderItems} isAdmin={user.isAdmin}/>
            </Col>
            <Col md={5}>
               <OrderSummery subtotal={calcSubTotal} order/>
               {!user.isAdmin ? <Button 
                  variant="dark" 
                  className="mt-5"
                  block 
                  onClick={() => history.push('/')}
                  ><i className="fas fa-home px-2"></i> Back to Home page
               </Button>
               :!order.isDelivered && <Button 
               variant="dark" 
               className="mt-5"
               block 
               onClick={() => markedAsDelivered(order._id)}
               > <i className="fas fa-shipping-fast px-2"></i> Marked as Delivered </Button>}
            </Col>
            </Row>
         </div> }
      </>
      );
 }
  
 export default Order;