import {useEffect} from 'react'
// import products from '../../products'
import ProductCard from '../../components/Product-Card/productCard'
import {Row, Col} from 'react-bootstrap'
import {useProductsDispatch, useProductsSate} from '../../store/productStore/products'
import * as productsActions from '../../store/productStore/actions'
import Loading from '../../components/Loading/loading'
import Alert from '../../components/Alert/alert'

const Home = (props) => {
    const dispatch = useProductsDispatch()
   const {products, loading, error} = useProductsSate()

    useEffect(() => {
        productsActions.fetchAll(dispatch)
    },[dispatch])
    return ( 
        <div className="home">
            {loading ? <Loading /> 
            : error ? <Alert type='danger'>{error}</Alert>
            :<Row>
            {products && products.map(product => 
                <Col sm="12" md="6" lg="4" key={product._id}>
                    <ProductCard product={product} />
                </Col>    
            )}
        </Row>}
            
        </div>
     );
}
 
export default Home;