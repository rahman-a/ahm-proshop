import {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {useLoginstate, useLoginDispatch} from '../../store/userStore/login'
import {useUpdateUserDispatch, useUpdateUserstate} from '../../store/userStore/update'
import {updateUserProfile} from '../../store/userStore/action'
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
    const {loading, error, success} = useUpdateUserstate()
    const L_dispatch = useLoginDispatch()
    const U_dispatch = useUpdateUserDispatch()
    
    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            return setMsg('The Password doesn\'t match')
        }
        setMsg(null)
        const credential = {
            name,email
        }
        if(password) credential.password = password
        console.log(credential)
        updateUserProfile(U_dispatch, L_dispatch, credential)
    }

    useEffect(() => {
        if(user){
            setName(user.user.name)
            setEmail(user.user.email)
        }
        !user && history.push('/login')
    },[user, history])
    return ( 
        <Row className="justify-content-md-center">
        <Col md={4}>
            <h1 className="py-3">Profile</h1>
            {success && <Alert type="success">Profile has been updated</Alert>}
            {error && <Alert type="danger">{error}</Alert>}
            {msg && <Alert type="danger">{msg}</Alert>}
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

                <Button type="submit" variant="dark" className="mt-2">Update</Button>
            </Form>
        </Col>
        <Col md={8}>
            <h1 className="py-3">Orders</h1>
        </Col>
    </Row>
     );
}
 
export default Register;