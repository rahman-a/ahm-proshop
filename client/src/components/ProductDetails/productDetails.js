import {useState} from 'react'
import {Row, Col, ListGroup, ListGroupItem, Button, Image, Form} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import Rating from '../../components/Rating/rating'
import {useLoginstate} from '../../store/userStore/login'

const ProductDetails = ({product}) => {
    const {user} = useLoginstate()
    const routerHistory = useHistory()
    const [qty, setQty] = useState(1)

    const addToCart = () => {
        routerHistory.push(`/cart/${product._id}?qty=${qty}`)
    }
    const isProductInCart = localStorage.getItem('CART_ITEM') 
    ? JSON.parse(localStorage.getItem('CART_ITEM')).find(item => user 
        ? item.id === product._id && item.user === user.user._id 
        : item.id === product._id  && !item.user) 
    : false
    return ( 
        <Row>
            <Col md={5}>
                <Image src={product.image} rounded  fluid/>
            </Col>
            <Col md={4}>
                <ListGroup variant="flush">
                    <ListGroupItem>
                        <h4>{product.name}</h4>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Rating rating={product.rating} review={`${product.numReviews} reviews`}/>   
                    </ListGroupItem>
                    <ListGroupItem>
                        Price: ${product.price}
                    </ListGroupItem>
                    <ListGroupItem>
                        Description: {product.description}
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={3}>
                <ListGroup>
                    <ListGroupItem>
                        <Row>
                            <Col>Price: </Col>
                            <Col>${product.price}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Stock: </Col>
                            <Col>{product.countInStock > 0 ? (product.countInStock > 1 ? `${product.countInStock} Units`:`${product.countInStock} Unit`): 'Out of Stock'}</Col>
                        </Row>
                    </ListGroupItem>
                    {product.countInStock > 0 && <ListGroupItem>
                        <Row>
                            <Col>Quantity: </Col>
                            <Col>
                            <Form.Control as="select" 
                            size='sm' 
                            value={qty} onChange={(e) => setQty(e.target.value)}
                            disabled={isProductInCart}>
                               { [...Array.from({length:product.countInStock}).keys()].map(q => {
                                   return <option value={q+1} key={q}>{q+1}</option>
                               } )}
                            </Form.Control>
                            </Col>
                        </Row>
                    </ListGroupItem>}
                    <ListGroupItem>
                        <Row>
                            <Col>
                                <Button 
                                variant="dark" 
                                block disabled={product.countInStock === 0 || isProductInCart}
                                onClick={addToCart}> {isProductInCart ?'Already in Cart' : 'Add to Cart' }</Button>
                            </Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </Col>
        </Row>
     );
}
 
export default ProductDetails;