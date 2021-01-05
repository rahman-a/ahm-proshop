import products from '../../products'
import ProductCard from '../../components/Product-Card/productCard'
import {Row, Col} from 'react-bootstrap'

const Home = (props) => {
    return ( 
        <div className="home">
            <Row>
                {products.map(product => 
                    <Col sm="12" md="6" lg="4" key={product._id}>
                        <ProductCard product={product} />
                    </Col>    
                )}
            </Row>
        </div>
     );
}
 
export default Home;