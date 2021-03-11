import {useEffect, useState} from 'react'
import {useProductsDispatch, useProductsSate} from '../../../store/productStore/products'
import {fetchAll} from '../../../store/productStore/actions'
import Alert from '../../../components/Alert/alert'
import Loading from '../../../components/Loading/loading'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useHistory, useLocation} from 'react-router-dom'
import productServices from '../../../services/productsAPI'
import Pagination from '../../../components/pagination/pagination'
import { Popconfirm, message } from 'antd';


const Products = () => {
    const [deleting, setDeleting] = useState(null)
    const dispatch = useProductsDispatch()
    const {products, loading, error, count, page:currentPage, pageSize} = useProductsSate()
    const history = useHistory()
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const keyword = query.get('keyword')
    const page = query.get('page')

    const editProductHandler = id => {
        history.push(`${location.pathname}/${id}`)
    }

    const deleteProductHandler = async id => {
            const {data:{message:done}} = await productServices.delete(id)
            message.success(done);
            setDeleting(true)
    }
    useEffect(() => {
        fetchAll(dispatch, keyword, page)
    },[dispatch,deleting, keyword, page])
    return ( 
       <>
        <Row className='align-items-center'>
            <Col> <h1>Products</h1> </Col>
            <Col className='text-right'>
                <Button variant='dark' onClick={() => history.push(`${location.pathname}/new`)}>
                    <i className="fas fa-plus mr-2"></i> 
                    Create Product
                </Button>
            </Col>
        </Row>
         <div className="users" style={{width:'105%'}}>
            {loading ? <Loading /> 
            : error ? <Alert type='danger'>{error}</Alert>
            :products && <Table striped bordered hover size='sm' className='mt-3'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {products.map((product, idx) => {
                    return(
                        <tr key={product._id}>
                        <td>{idx + 1}</td>
                        <td>{product._id}</td>
                        <td style={{maxWidth:'330px',overflow:'auto'}}>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.countInStock > 0 ? (product.countInStock > 1 ? `${product.countInStock} Units`:`${product.countInStock} Unit`): 'Out of Stock'}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                        <Button onClick={() => editProductHandler(product._id)} variant='light'>
                            <i className="fas fa-edit" style={{color:'#075394'}}></i>
                        </Button>
                        <Popconfirm
                        placement="topRight"
                        title="Are you sure to delete this product?"
                        onConfirm={() => deleteProductHandler(product._id)}
                        okText="Yes"
                        cancelText="No"
                        >
                            <Button variant='light'>
                                <i className="fas fa-trash-alt" style={{color:'#c10303'}}></i>
                            </Button>
                        </Popconfirm>
                        </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            }
        </div>
        <Pagination 
            count={count}
            page={currentPage}
            size={pageSize}
            keyword={keyword}
            />
       </>
     );
}
 
export default Products;