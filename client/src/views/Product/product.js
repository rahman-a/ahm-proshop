import {useEffect} from 'react'
import {useParams, useHistory,Link} from 'react-router-dom'
import {Button,Row,Col} from 'react-bootstrap'
import * as productsActions from '../../store/productStore/actions'
import {useProductDispatch, useProductState} from '../../store/productStore/product'
import {useCreateReviewState} from '../../store/productStore/review'
import {useLoginstate} from '../../store/userStore/login'
import ProductDetails from '../../components/ProductDetails/productDetails'
import ProductReview from '../../components/ProductReview/productReview'
import CreateReview from '../../components/ProductReview/createReview'
import Loading from '../../components/Loading/loading'
import Alert from '../../components/Alert/alert'

const Product = (props) => {
    const {user} = useLoginstate()
    const dispatch = useProductDispatch()
    const {message} = useCreateReviewState()
    const routerHistory = useHistory()
    const {product, loading, error} =  useProductState()
    const {id} = useParams()
    const routerGoBack = () => routerHistory.goBack()
    useEffect(() => {
        productsActions.fetchOne(dispatch, id)
    },[dispatch, id, message])

    return (
        <div className="product">
            <Button variant="light" className='mb-4 px-2' onClick={routerGoBack}>
                <i className='fas fa-arrow-left pr-2'></i> 
                BACK
            </Button>
            {loading ? <Loading /> 
            : error ? <Alert type='danger'>{error}</Alert>
            : product && 
            <>
                <ProductDetails product={product}/>
                <Row className='mt-5'>
                    <Col md={6}>
                        <h4>Reviews</h4>
                        {product.reviews.length > 0 ? product.reviews.map(review => {
                        return <ProductReview 
                            key={review._id}
                            name={review.name}
                            date={review.createdAt}
                            rating={review.rating}
                            comment={review.comment}
                        />
                        })
                        : <Alert type='warning'><h6>No Reviews yet for this Product</h6></Alert>} 
                        {user ? <CreateReview id={product._id}/> 
                        :<Alert type='info'> Please 
                            <Link to='/login'> <span style={{fontWeight:'bolder', color:'#000'}}>Log in</span> </Link> 
                            to Review the Product
                        </Alert>}
                    </Col>
                </Row>
                
            </>}
        </div> 
    );
}
 
export default Product;