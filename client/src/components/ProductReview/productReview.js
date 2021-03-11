import {ListGroup} from 'react-bootstrap'
import Rating from '../Rating/rating'

const ProductReview = ({name, date, rating, comment}) => {
    return ( 
        <>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h6>{name}</h6>
                    <div><Rating rating={rating}/></div>
                    <p className='text-muted'>{date.substring(0,10)}</p>
                    <h6>{comment}</h6>
                    <hr />
                </ListGroup.Item>
            </ListGroup>
        </>
     );
}
 
export default ProductReview;