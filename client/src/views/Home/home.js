import {useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import ProductCard from '../../components/Product-Card/productCard'
import Pagination from '../../components/pagination/pagination'
import Slider from '../../components/Carousel/carousel'
import {Row, Col, Button} from 'react-bootstrap'
import {useProductsDispatch, useProductsSate} from '../../store/productStore/products'
import {TopProductsProvider} from '../../store/productStore/topProducts'
import {fetchAll} from '../../store/productStore/actions'
import Loading from '../../components/Loading/loading'
import Alert from '../../components/Alert/alert'

const Home = (props) => {
    const dispatch = useProductsDispatch()
   const {products, loading, error, count, page:currentPage, pageSize} = useProductsSate()
   const location = useLocation()
   const history = useHistory()
   const query = new URLSearchParams(location.search)
   const keyword = query.get('keyword')
   const page = query.get('page')

    useEffect(() => {
       fetchAll(dispatch,keyword,page)
    },[dispatch,keyword, page])
    return ( 
        <div className="home">
            {!keyword ? 
            <TopProductsProvider>
                <Slider />
            </TopProductsProvider> : <Button variant="light" className='mb-4 px-2' onClick={() => history.goBack()}>
                <i className='fas fa-arrow-left pr-2'></i> 
                BACK
            </Button>}
            {loading ? <Loading /> 
            : error ? <Alert type='danger'>{error}</Alert>
            :<Row className='mt-5'>
            {products && products.map(product => 
                <Col sm="12" md="6" lg="4" key={product._id}>
                    <ProductCard product={product} />
                </Col>    
            )}
        </Row>}
            <Pagination 
            count={count}
            page={currentPage}
            size={pageSize}
            keyword={keyword}
            />
        </div>
     );
}
 
export default Home;