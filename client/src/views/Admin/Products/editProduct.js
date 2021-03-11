import {useEffect, useState} from 'react'
import {useProductDispatch, useProductState} from '../../../store/productStore/product'
import {fetchOne} from '../../../store/productStore/actions'
import {useUpdateProductDispatch, useUpdateProductState} from '../../../store/productStore/update'
import {updateProduct} from '../../../store/productStore/actions'
import {useParams,useHistory} from 'react-router-dom'
import Alert from '../../../components/Alert/alert'
import Loading from '../../../components/Loading/loading'
import {Row, Col, Button, Form} from 'react-bootstrap'

const EditProduct = (props) => {
    const {id} = useParams()
    const history = useHistory()
    const dispatch = useProductDispatch()
    const updateDispatch = useUpdateProductDispatch()
    const {loading:updating, error:updError} = useUpdateProductState()
    const {loading, error, product} = useProductState()
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState(null)
    const [price, setPrice] = useState(null)
    const [countInStock, setStock] = useState(null)
    const [brand, setBrand] = useState(null)
    const [category, setCategory] = useState(null)
    
    const submitHandler = e => {
        e.preventDefault()
        const data = {name, description, image, price, countInStock, brand, category}
        const formData = new FormData()
        for(let key in data){
            if(data[key]) formData.append(key, data[key])
        }
        updateProduct(updateDispatch, id, formData)
    }
    const imgUploadHandler = e => {
        const image = e.target.files[0]
        setImageName(image.name)
        setImage(image)
    }
    useEffect(() => {
        fetchOne(dispatch, id)
    },[dispatch,id,updating])
    return ( 
        <>
            <Button variant='light' onClick={() => history.goBack()}>
                <i className="fas fa-arrow-left mr-2"></i>  Go Back
            </Button>
            {loading ? <Loading /> 
            : error ? <Alert type='danger'>{error}</Alert>
            : updError ? <Alert type='danger'>{updError}</Alert>
            :product && 
            <Row className="justify-content-md-center">
                <Col md={6} xm={12}>
                    <h1 className='my-4'>Product Edit </h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Enter Product Name</Form.Label>
                            <Form.Control type='text' 
                            defaultValue={product.name}
                            onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
        
                        <Form.Group>
                            <Form.Label>Enter Product Description</Form.Label>
                            <Form.Control as="textarea"
                            row={20} 
                            defaultValue={product.description}
                            onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Upload Product Image</Form.Label>
                            <Form.File id="formcheck-api-custom" custom>
                                <Form.File.Input isValid onChange={imgUploadHandler}/>
                                <Form.File.Label 
                                data-browse={ imageName ? '✔' : '☁' }>
                                   {imageName}
                                </Form.File.Label>
                                {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
                            </Form.File>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Set Product Price</Form.Label>
                            <Form.Control type='text' 
                            defaultValue={product.price}
                            onChange={(e) => setPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Set Product Stock</Form.Label>
                            <Form.Control type='text' 
                            defaultValue={product.countInStock}
                            onChange={(e) => setStock(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Enter Product Brand</Form.Label>
                            <Form.Control type='text' 
                            defaultValue={product.brand}
                            onChange={(e) => setBrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Enter Product Category</Form.Label>
                            <Form.Control type='text' 
                            defaultValue={product.category}
                            onChange={(e) => setCategory(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="dark" className="mt-2">Update</Button>
                    </Form>
                </Col>
            </Row>}
        </>
     );
}
 
export default EditProduct;