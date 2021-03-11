import {ListGroup, Row, Col, Image} from 'react-bootstrap'

const OrderItems = ({items, isAdmin}) => {
    return (
        <>
        <h4>{isAdmin ? 'The Order Items': 'Your Order Items'}</h4>
        <ListGroup variant='flush'>
            {items.map(item => 
            <ListGroup.Item key={item.id || item._id}>
                <Row>
                    <Col md={8}>
                        <Row className="justify-content-md-center">
                            <Col md={3}><Image src={item.image || item.img} alt={item.name} fluid thumbnail></Image></Col>              
                            <Col md={9}><h6>{item.name}</h6></Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                        {`${item.quantity || item.qty}x ${item.price} = ${((item.quantity || item.qty) * item.price).toFixed(2)}$`}
                    </Col>
                </Row>
            </ListGroup.Item>)}
        </ListGroup>
        </>
     );
}
 
export default OrderItems;