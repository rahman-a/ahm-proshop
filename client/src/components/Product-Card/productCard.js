import {Card} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Rating from '../../components/Rating/rating'

const ProductCard = ({product}) => {
    const {_id, image, name, price, category, rating, numReviews} = product
    return ( 
        <Card style={{ width: '18rem' }} className="my-2">
            <LinkContainer to={`/product/${_id}`}>
                <Card.Link>
                    <Card.Img variant="top" src={image} />
                </Card.Link>
            </LinkContainer>
            <Card.Body>
                <LinkContainer to={`/product/${_id}`}>
                    <Card.Link>
                        <Card.Title>{name}</Card.Title>
                    </Card.Link>
                </LinkContainer>
                <LinkContainer to={`/products/${category}`}>
                    <Card.Link>
                        <Card.Subtitle className="mb-2 text-muted">
                            Category: <span className="categoryName">{category}</span> 
                        </Card.Subtitle>
                    </Card.Link>
                </LinkContainer>
                <Card.Text as="div" className="py-2">
                    <Rating rating={rating} review={`${numReviews} reviews`}/>
                </Card.Text>
                <Card.Text as="h5" className="py-3">
                    <div>Price: {price}$</div>
                </Card.Text>
            </Card.Body>
        </Card>
     );
}
 
export default ProductCard;