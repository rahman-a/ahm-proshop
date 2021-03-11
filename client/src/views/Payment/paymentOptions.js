import {OverlayTrigger, Tooltip, Row, Col} from 'react-bootstrap'

const PaymentOption = ({setPaymentOption}) => {
    return ( 
        <Row>
            <Col>
                <OverlayTrigger
                    key='credit'
                    placement='bottom'
                    overlay={
                        <Tooltip id='tooltip-credit'>
                        Pay with <strong>Card</strong>.
                        </Tooltip>
                    }
                    >
                    <label htmlFor="credit" className='payment__option'>
                        <input type="radio" 
                        name='payment' 
                        id='credit' 
                        value='card'
                        onChange={(e) => setPaymentOption(e.target.value)}
                        defaultChecked/>
                        <h6>Pay with Card</h6>
                    </label>
                </OverlayTrigger>
            </Col>
            <Col>
                <OverlayTrigger
                    key='paypal'
                    placement='bottom'
                    overlay={
                        <Tooltip id='tooltip-paypal'>
                        Pay with <strong>Paypal</strong>.
                        </Tooltip>
                    }
                    >
                    <label htmlFor="paypal__input" className='payment__option'>
                        <input type="radio" 
                        name='payment' 
                        id='paypal__input' 
                        value='paypal'
                        onChange={(e) => setPaymentOption(e.target.value)}/>
                        <h6>Pay with Paypal</h6>
                    </label>
                </OverlayTrigger>
            </Col>
            <Col>
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
                        <input type="radio" 
                        name='payment' 
                        id='cod' 
                        value='cod' 
                        onChange={(e) => setPaymentOption(e.target.value)}/>
                        <h6>Cash on Delivery (COD)</h6>
                    </label>
                </OverlayTrigger>
            </Col>
        </Row>
     );
}
 
export default PaymentOption;