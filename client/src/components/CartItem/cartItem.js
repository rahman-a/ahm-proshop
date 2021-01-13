import {Row, Col, Form, Image, Button} from 'react-bootstrap'

const CartItem = ({item, removeItem, updateitem}) => {
    return ( 
        <Row className="my-4">
            <Col md={3}> <Image src={item.image} alt={item.name} fluid thumbnail/> </Col>
            <Col md={6}>
                <h5>{item.name}</h5>
                <h6 style={{marginTop:'revert'}}>unit price: {item.price}$</h6>
            </Col>
            <Col md={2}>
                <Form.Control as="select" 
                    size='sm' 
                    defaultValue={item.quantity} onChange={(e) => updateitem(item.id, e.target.value)}>
                    { [...Array.from({length:item.countInStock}).keys()].map(q => {
                        return <option value={q+1} key={q}>{q+1}</option>
                    } )}
                </Form.Control>
            </Col>
            <Col md={1}><Button variant='light' onClick={() => removeItem(item.id)}><i className="fas fa-trash"></i></Button></Col>
            <hr />
        </Row>
     );
}
 
export default CartItem;