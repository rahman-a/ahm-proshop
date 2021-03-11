import {useEffect} from 'react'
import {Table, Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {useOrdersDispatch, useOrdersState} from '../../store/orderStore/allOrders'
import {getALlUserOrders} from '../../store/orderStore/actions'
import Alert from '../Alert/alert'
import Loading from '../Loading/loading'

const UserOrders = (props) => {
    const dispatch = useOrdersDispatch()
    const {loading, error, orders} = useOrdersState()
    const history = useHistory()
    useEffect(() => {
        getALlUserOrders(dispatch)
    },[dispatch])
    return ( 
        <>
            {loading ? <Loading />
            : error ? <Alert type='danger'>{error}</Alert>
            :<div className="orders">
                <h1 className='py-3'>Orders</h1>
                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders && orders.map((order,i) => {
                    return (
                        <tr key={order._id}>
                            <td style={{textAlign:'center'}}>{i + 1}</td>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{(order.totalPrice / 100).toFixed(2)}$</td>
                            <td style={{textAlign:'center'}}>{order.isPaid 
                                ?order.paidAt.substring(0,10)
                                :<i className="fas fa-times-circle" style={{color:'red'}}></i>}
                                </td>
                            <td style={{textAlign:'center'}}>{order.isDelivered 
                                ?order.deliveredAt.substring(0,10):
                                <i className="fas fa-times-circle" style={{color:'red'}}></i> }
                            </td>
                            <td>
                                <Button variant="light"
                                className='btn-sm'
                                onClick={() => history.push(`/order/${order._id}`)}>
                                DETAILS</Button>
                            </td>
                        </tr>
                    )
                    })}
                        
                    </tbody>
                </Table>
            
            </div>}
        </>
     );
}
 
export default UserOrders;