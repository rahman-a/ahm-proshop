import products from '../../products'
import {useParams} from 'react-router-dom'
import Rating from '../../components/Rating/rating'
import {Row, Col, ListGroup, ListGroupItem, Button, Image} from 'react-bootstrap'

const Product = (props) => {
    const {id} = useParams()
    const {name, 
           image, 
           description, 
           price, 
           countInStock, 
           rating, 
           numReviews} = products.find(p => p._id === id)

    return ( 
        <div className="product">
            <Row>
                <Col md={5}>
                    <Image src={image} rounded  fluid/>
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h4>{name}</h4>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating rating={rating} review={`${numReviews} reviews`}/>   
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: ${price}
                        </ListGroupItem>
                        <ListGroupItem>
                            Description: {description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroupItem>
                            <Row>
                                <Col>Price: </Col>
                                <Col>${price}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Quantity: </Col>
                                <Col>{countInStock > 0 ? (countInStock > 1 ? `${countInStock} Units`:`${countInStock} Unit`): 'Out of Stock'}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    <Button variant="dark" block disabled={countInStock === 0}> Add to Cart </Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </div> 
    );
}
 
export default Product;