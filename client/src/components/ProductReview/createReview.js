import {useState} from 'react'
import {useCreateReviewDispatch, useCreateReviewState} from '../../store/productStore/review'
import {createReview} from '../../store/productStore/actions'
import {Form, Button} from 'react-bootstrap'
import Alert from '../Alert/alert'
import Loading from '../Loading/loading'

const CreateReview = ({id}) => {
    const [rating, setRating] = useState('0')
    const [comment, setComment] = useState('')
    const [ratingError, setRatingError] = useState(null)
    const dispatch = useCreateReviewDispatch()
    const {loading, error} = useCreateReviewState()

    const reviewSubmitHandler = e => {
        e.preventDefault()
        if(rating === '0'){
            setRatingError('Please choose a Rating')
            return
        }
        setRatingError(null)
        const review = {
            rating, comment
        }
        createReview(dispatch, id, review)
    }
    return ( 
        <>
            <hr />
            <h5>Review this Product</h5>
            {(ratingError || error) && <Alert type='danger'>{ratingError || error }</Alert>}
            {loading && <Loading />}
            <Form onSubmit={reviewSubmitHandler}>
            <Form.Group>
            <Form.Control size="sm" as="select" onChange={(e) => setRating(e.target.value)}>
                <option value='0'>Rate this Product</option>
                <option value='1'>Poor -1</option>
                <option value='2'>Fair -2</option>
                <option value='3'>Good -3</option>
                <option value='4'>Very Good -4</option>
                <option value='5'>Excellent -5</option>
            </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Write Your Review</Form.Label>
                <Form.Control as="textarea" rows={3}  onChange={(e) => setComment(e.target.value)}/>
            </Form.Group>
            <Button type='submit' variant='secondary'>Submit</Button>
            </Form>
        </>
     );
}
 
export default CreateReview;