import {useEffect} from 'react'
import {useParams, useLocation, useHistory} from 'react-router-dom'
import {useCartDipatch, useCartState} from '../../store/cartStore/cart'
import {addItemTOCart, removeItemFromCart} from '../../store/cartStore/action'
import CartItem from '../../components/CartItem/cartItem'
import {Row, Col, ListGroup, ListGroupItem,Button} from 'react-bootstrap'
import {useLoginstate} from '../../store/userStore/login'

const Cart = (props) => {
    const dispatch = useCartDipatch()
    const items = useCartState()
    const {id} = useParams()
    const routerHistory = useHistory()
    const {user} = useLoginstate()
    const query =  new URLSearchParams(useLocation().search)
    const quantity =  Number(query.get("qty"))
    const routerGoBack = () => routerHistory.push('/')
    const removeItem = (id) => {
        removeItemFromCart(dispatch, id)
    }
    const updateitem = (id, quantity) => {
        addItemTOCart(dispatch, id, Number(quantity))
    }
    const checkOut = () => {
       routerHistory.push('/shipping')
    }
    const calcTotalPrice = () => {
       const total =  items.reduce((acc, item) => acc + item.quantity * item.price,0)
       return total.toFixed(2)
    }
    useEffect(() => {
        if(id) {
            user ? addItemTOCart(dispatch, id,  Number(quantity),user.user._id)
            : addItemTOCart(dispatch, id,  Number(quantity))
        }
    },[dispatch, id, quantity,user])
    return ( 
        <div className="cart">
             <Button variant="light" className='mb-4 px-2' onClick={routerGoBack}>
                <i className='fas fa-arrow-left pr-2'></i> 
                BACK
            </Button>
           {items.length > 0 ? <Row>
               <Col md={7}>
                    {items && items.map(item => <CartItem item={item} 
                    removeItem={removeItem} 
                    key={item.id}
                    updateitem={updateitem}/>)}
               </Col>
               <Col md={1}></Col>
               <Col md={4}>
                    <ListGroup>
                        <ListGroupItem>
                            <Row>
                                <Col md={12}>
                                    <h5>Sub Total Items (
                                        {items.reduce((acc, item) => acc + item.quantity, 0)}
                                        )</h5>
                                    Total Price: {calcTotalPrice()}$
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    <Button 
                                    variant="dark" 
                                    block 
                                    onClick={checkOut}>proceed to checkout</Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
               </Col>
           </Row>: <div style={{textAlign:'center'}}>
            <i className="fas fa-shopping-cart" style={{fontSize:'15rem', color:'#333'}}></i>
            <h4 className="m-4">Your Cart is Empty</h4>
           </div> }
        </div>
     );
}
 
export default Cart;