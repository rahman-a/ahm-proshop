import {useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {Form, FormControl, Button} from 'react-bootstrap'

const SearchBox = (props) => {
    const [keyword, setKeyword] = useState(null)
    const history = useHistory()
    const location = useLocation()
    const searchHandler = e => {
        e.preventDefault()
        if(keyword) return history.push(`${location.pathname}?keyword=${keyword}`)
        history.push(`${location.pathname}`)
    }
    return ( 
        <Form inline onSubmit={searchHandler}>
            <FormControl type="text" 
            placeholder="Search" 
            className="mr-sm-2" size='sm'
            onChange={(e) => setKeyword(e.target.value)}/>
            <Button type='submit' variant="outline-info" size='sm'>Search</Button>
        </Form>
     );
}
 
export default SearchBox;