import {useEffect} from'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useUsersIndexDispatch, useUsersIndexstate} from '../../../store/userStore/allUsersIndex'
import {useUserDeleteDispatch, useUserDeletestate} from '../../../store/userStore/deleteUser'
import {deleteUser} from '../../../store/userStore/action'
import {indexAllUsers} from '../../../store/userStore/action'
import Alert from '../../../components/Loading/loading'
import Loading from '../../../components/Loading/loading'
import {Table,Button} from 'react-bootstrap'
import { Popconfirm} from 'antd';


const Users = () => {
    const dispatch = useUsersIndexDispatch()
    const {loading, error, users} = useUsersIndexstate()
    const deleteDispatch = useUserDeleteDispatch()
    const {loading:deleting} = useUserDeletestate()
    const history = useHistory()
    const location = useLocation()
    
    const viewUserHandler = (id) => {
        history.push(`${location.pathname}/${id}`)
    }
    const deleteUserHandler = (id) => {
        deleteUser(deleteDispatch, id)
    }
    useEffect(() => {
        indexAllUsers(dispatch)
    },[dispatch,deleting])
    return ( 
        <>
        <h1>Users</h1>
        <div className="users">
            {loading ? <Loading /> 
            : error ? <Alert type='danger'>{error}</Alert>
            :users && <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>E-MAIL</th>
                    <th>ISADMIN</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, idx) => {
                    return(
                        <tr key={user._id}>
                        <td>{idx + 1}</td>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                        <td style={{textAlign:'center'}}>{
                            user.isAdmin 
                            ? <i className="fas fa-user-check" style={{color:'green'}}></i>
                            : <i className="fas fa-user-times" style={{color:'red'}}></i>
                        }</td>
                        <th>
                        <Button onClick={() => viewUserHandler(user._id)} variant='light'>
                            <i className="fas fa-eye" style={{color:'#075394'}}></i>
                        </Button>
                        <Popconfirm 
                        placement="topRight"
                        title="Are you sure to delete this user?"
                        onConfirm={() => deleteUserHandler(user._id)}
                        okText="Yes"
                        cancelText="No">
                            <Button variant='light' disabled={deleting}>
                            {deleting ? <Loading /> 
                            :<i className="fas fa-trash-alt" style={{color:'#c10303'}}></i>}
                            </Button>
                        </Popconfirm>
                        </th>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            }
        </div>
    </>
     );
}
 
export default Users;