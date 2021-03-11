import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useTopProductsDispatch, useTopProductsSate} from '../../store/productStore/topProducts'
import {getTopProduct} from '../../store/productStore/actions'
import {Carousel, Image} from 'react-bootstrap'
import Loading from '../Loading/loading'
import Alert from '../Alert/alert'

const Slider = (props) => {
    const dispatch = useTopProductsDispatch()
    const {loading, error, products} = useTopProductsSate()

    useEffect(() => {
        getTopProduct(dispatch)
    },[dispatch])
    return ( 
        <Carousel className='bg-dark'>
            {loading ? <Loading /> 
            : error ? <Alert>{error}</Alert>
            :products && products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image
                        src={product.image}
                        alt={product.name}
                        fluid
                        /> 
                    </Link>
                    <Carousel.Caption>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))
            
            }
        </Carousel>
     );
}
 
export default Slider;