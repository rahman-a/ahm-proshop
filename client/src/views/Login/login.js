import {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useHistory, Link, useLocation} from 'react-router-dom'
import {useLoginstate, useLoginDispatch} from '../../store/userStore/login'
import {authenticateUser} from '../../store/userStore/action'
import Alert from '../../components/Alert/alert'
import Loading from '../../components/Loading/loading'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useLoginDispatch()
    const {loading, user, error} = useLoginstate()
    const history = useHistory()
    const location = useLocation()
    const query = new URLSearchParams(location.search)

    const submitHandler = (e) => {
        e.preventDefault()
        const credential = {email,password}
        authenticateUser(dispatch, credential)
        setEmail('')
        setPassword('')
    }
    useEffect(() => {
        const redirect = query.get('redirect') ?  query.get('redirect') : ''
        user && history.push(`/${redirect}`)
    })
    return ( 
    <Row className="justify-content-md-center">
        <Col md={6} xm={12}>
            <h1 className="py-3">Sign in</h1>
            {error && <Alert type="danger">{error}</Alert>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Enter Your E-mail</Form.Label>
                    <Form.Control type='email' 
                    placeholder="Your E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Enter Your Password</Form.Label>
                    <Form.Control type='password' 
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type="submit" variant="dark" className="mt-2">Login</Button>
                <h6 className="py-4">New Customer? <Link to="/register">Register</Link></h6>
            </Form>
        </Col>
    </Row>
    );
}
 
export default Login;