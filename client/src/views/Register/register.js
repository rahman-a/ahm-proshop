import {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {useRegisterDispatch, useRegisterstate} from '../../store/userStore/register'
import {useLoginstate, useLoginDispatch} from '../../store/userStore/login'
import {registerNewUser} from '../../store/userStore/action'
import Alert from '../../components/Alert/alert'
import Loading from '../../components/Loading/loading'


const Register = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [msg, setMsg] = useState(null)
    const history = useHistory()
    const {user} = useLoginstate()
    const L_dispatch = useLoginDispatch()
    const {loading, error} = useRegisterstate()
    const R_dispatch = useRegisterDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
           return setMsg('The password doesn\'t match')
        } 
        const credential ={
            name,
            email,
            password,
            confirmPassword,
        }
        registerNewUser(R_dispatch, L_dispatch, credential)
       setMsg(null)
    }

    useEffect(() => {
        user && history.push('/')
    })
    return ( 
        <Row className="justify-content-md-center">
        <Col md={6} xm={12}>
            <h1 className="py-3">Register</h1>
            {msg && <Alert type="danger">{msg}</Alert>}
            {error && <Alert type="danger">{error}</Alert>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Enter Your Name</Form.Label>
                    <Form.Control type='text' 
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Enter Your E-mail</Form.Label>
                    <Form.Control type='email' 
                    placeholder="Your E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Enter Your Password</Form.Label>
                    <Form.Control type='password' 
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Confirm Your Password</Form.Label>
                    <Form.Control type='password' 
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="dark" className="mt-2">Register</Button>
                <h6 className="py-4">Already Customer? <Link to="/login">Login</Link></h6>
            </Form>
        </Col>
    </Row>
     );
}
 
export default Register;