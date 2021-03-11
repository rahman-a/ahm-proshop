import {ListGroup,Row, Col, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const PaymentSummery = ({subtotal,payment,order}) => {
    const calcTax = () => {
        const tax = subtotal() < 1000 ? subtotal() * 0.05 : 0
        return tax.toFixed(2)
    }
    const total = () => {
        let total;
        if(payment === 'cod') {
            total = Number(subtotal()) + Number(calcTax()) + 50 + 25
        }else {
            total = Number(subtotal()) + Number(calcTax()) + 50
        }
        return total.toFixed(2)
    }
    const address = JSON.parse(localStorage.getItem('client_address'))

    return ( 
        <Card>
            <Card.Body>
                <Card.Title> <h5>Order Summery</h5></Card.Title>
                <ListGroup variant="flush" style={{width:'100%'}}>
                <ListGroup.Item>
                    <Row>
                        <Col>Subtotal</Col>
                        <Col>{`${subtotal()}$`}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax</Col>
                        <Col>{`${calcTax()}$`}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>50.00$</Col>
                    </Row>
                </ListGroup.Item>
                {payment === 'cod' && <ListGroup.Item>
                    <Row>
                        <Col>COD</Col>
                        <Col>25.00$</Col>
                    </Row>
                </ListGroup.Item>}
                <ListGroup.Item>
                    <Row>
                        <Col> <span style={{fontWeight:'bold',fontSize:'1.2rem'}}>Total</span></Col>
                        <Col><span style={{fontWeight:'bold',fontSize:'1.2rem'}}>{`${total()}$`}</span></Col>
                    </Row>
                </ListGroup.Item>
                {!order && <div className="shipAddress">
                    <h6 style={{
                        backgroundColor:'#eee', 
                        padding:'10px',
                        display:'flex',
                        justifyContent:'space-between'}}>
                    <span>Ship To </span>
                     <Link to='/shipping'>Edit</Link>
                     </h6>
                    <p style={{paddingTop:'1rem'}}>{`${address.address}-${address.city}-${address.country}`}</p>
                </div> }
                </ListGroup> 
            </Card.Body>
        </Card>
     );
}
 
export default PaymentSummery;