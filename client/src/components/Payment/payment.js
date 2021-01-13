import CheckoutProgress from '../checkoutProgress/checkoutProgress'
import {Row, Col, Container, OverlayTrigger, Tooltip, Button} from 'react-bootstrap'
const Payment = ({stepChange}) => {

    const setPaymentHandler = () => {
        stepChange('order')
    }
    return ( 
        <div className="payment">
             <CheckoutProgress step={2}/>
             <form style={{textAlign:'center'}}>
                 <Container>
                    <Row className="justify-content-md-center">
                        <Col style={{display:'flex', justifyContent:'center'}}>
                        <OverlayTrigger
                            key='paypal'
                            placement='bottom'
                            overlay={
                                <Tooltip id='tooltip-paypal'>
                                Pay with <strong>Paypal</strong>.
                                </Tooltip>
                            }
                            >
                            <label htmlFor="paypal" className='payment__option'>
                                <input type="radio" name='payment' id='paypal'/>
                                <i className="fab fa-cc-paypal"></i>
                            </label>
                        </OverlayTrigger>
                        </Col>
                        <Col style={{display:'flex', justifyContent:'center'}}>
                        <OverlayTrigger
                            key='stripe'
                            placement='bottom'
                            overlay={
                                <Tooltip id='tooltip-stripe'>
                                Pay with <strong>Stripe</strong>.
                                </Tooltip>
                            }
                            >
                            <label htmlFor="stripe" className='payment__option'>
                                <input type="radio" name='payment' id='stripe'/>
                                <i className="fab fa-cc-stripe"></i>
                            </label>
                        </OverlayTrigger>
                        </Col>
                        <Col style={{display:'flex', justifyContent:'center'}}>
                        <OverlayTrigger
                            key='credit'
                            placement='bottom'
                            overlay={
                                <Tooltip id='tooltip-credit'>
                                Pay with <strong>Credit Card</strong>.
                                </Tooltip>
                            }
                            >
                            <label htmlFor="credit" className='payment__option'>
                                <input type="radio" name='payment' id='credit'/>
                                <i className="fas fa-credit-card"></i>
                            </label>
                        </OverlayTrigger>
                        </Col>
                        <Col style={{display:'flex', justifyContent:'center'}}>
                        <OverlayTrigger
                            key='cod'
                            placement='bottom'
                            overlay={
                                <Tooltip id='tooltip-cod'>
                                Cash on Delivery <strong>COD</strong>.
                                </Tooltip>
                            }
                            >
                            <label htmlFor="cod" className='payment__option'>
                                <input type="radio" name='payment' id='cod'/>
                                <i className="fas fa-money-bill-wave"></i>
                            </label>
                        </OverlayTrigger>
                        </Col>
                    </Row>    
                    <Button type="submit" variant="dark" className="mt-2 payBtn" onClick={setPaymentHandler}>Continue</Button>
                 </Container>
             </form>
        </div>
     );
}
 
export default Payment;