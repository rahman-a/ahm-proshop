import {useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import * as productsActions from '../../store/productStore/actions'
import {useProductDispatch, useProductState} from '../../store/productStore/product'
import ProductDetails from '../../components/ProductDetails/productDetails'
import Loading from '../../components/Loading/loading'
import Alert from '../../components/Alert/alert'

const Product = (props) => {
    const dispatch = useProductDispatch()
    const routerHistory = useHistory()
    const {product, loading, error} =  useProductState()
    const {id} = useParams()
    const routerGoBack = () => routerHistory.goBack()
    useEffect(() => {
        productsActions.fetchOne(dispatch, id)
    },[dispatch, id])

    return (
        <div className="product">
            <Button variant="light" className='mb-4 px-2' onClick={routerGoBack}>
                <i className='fas fa-arrow-left pr-2'></i> 
                BACK
            </Button>
            {loading ? <Loading /> 
            : error ? <Alert type='danger'>{error}</Alert>
            : product && <ProductDetails product={product}/>}
        </div> 
    );
}
 
export default Product;