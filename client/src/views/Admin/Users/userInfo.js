import {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Button, Form,Row, Col} from 'react-bootstrap'
import {useUserDispatch, useUserstate} from '../../../store/userStore/userInfo'
import {getUserById} from '../../../store/userStore/action'
import Loading from '../../../components/Loading/loading'
import Alert from '../../../components/Alert/alert'
import userSevices from '../../../services/usersAPI'
import {message} from 'antd'

const UserInfo = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const {id} = useParams()
    const history = useHistory()
    const dispatch = useUserDispatch()
    const {loading, error, user} = useUserstate()

    const setAdminHandler = async (id) => {
       const {data} = await userSevices.setAsAdmin(id)
       setIsAdmin(!isAdmin)
        message.success(data.message)
    }
    useEffect(() => {
        getUserById(dispatch, id)
    },[dispatch,id,isAdmin])
    return ( 
        <>
        <Button variant='light' onClick={() => history.goBack()}>
            <i className="fas fa-arrow-left mr-2"></i>  Go Back
        </Button>
        <div className="info">
           {loading ? <Loading /> 
           : error ? <Alert type="danger">{error}</Alert>
           : user &&
           <Row className="justify-content-md-center">
                <Col md={6} xm={12}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' 
                            defaultValue={user.name}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type='email' 
                            defaultValue={user.email}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label={user.isAdmin ? 'Set Admin as User': 'Set User as Admin'} 
                            checked={user.isAdmin}
                            className='mb-3'
                            onChange={() => setAdminHandler(user._id)}
                            />
                        </Form.Group>
                    </Form>
                </Col> 
            </Row>}
        </div>
        </>
     );
}
 
export default UserInfo;