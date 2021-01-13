import {useState, useEffect} from 'react'
import CheckoutProgress from '../checkoutProgress/checkoutProgress'
import {Row, Col, Form, Button} from 'react-bootstrap'
import {countries} from 'countries-list'

const Shipping = ({stepChange}) => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const [countriesList, setCountriesList] = useState([])

    const submitHandler = (e) => {
        e.preventDefault()
    }
    const setAddressHandler = () => {
        stepChange('payment')
    }
    console.log(countriesList)
    useEffect(() => {
        const list = []
        for(let key in countries){
           list.push({code:key, name:countries[key].name})
        }
        setCountriesList(list)
    },[])
    return ( 
        <div className="shipping">
            <CheckoutProgress step={1}/>
        <Row className="justify-content-md-center">
        <Col md={6} xm={12}>
        <h2 className="py-3">Shipping Address</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Enter Your address &#x1F1E6;</Form.Label>
                    <Form.Control type='text' 
                    placeholder="Your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Enter Your City</Form.Label>
                    <Form.Control type='text' 
                    placeholder="Your City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Enter Your Postal Code</Form.Label>
                    <Form.Control type='text' 
                    placeholder="Your Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Select Your country</Form.Label>
                    <Form.Control as='select'
                    placeholder=" Select Your Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                   >
                    <option className='country' selected>Select Your Country</option>
                    {countriesList && countriesList.map(country => 
                       <option key={country.code} value={country.name}>{country.name}</option>
                    )}
                   </Form.Control>
                </Form.Group>

                <Button type="submit" variant="dark" className="mt-2" onClick={setAddressHandler}>Set The Address</Button>
            </Form>
        </Col>
    </Row>
    </div>
     );
}

export default Shipping;