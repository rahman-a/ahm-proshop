import {useLocation, useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'

const NotMatch = (props) => {
    const location = useLocation()
    const history = useHistory()
    const goHomePage = () => {
        history.push('/')
    }
    return ( 
        <div className="notmatch">
            <h1 style={{fontSize:'10rem', letterSpacing:'3rem'}}>404</h1>
            <h4>No Match for ( <code style={{color:'#bf0b0b'}}>{location.pathname}</code> )</h4>
            <Button onClick={goHomePage} className="mt-4"><i className="fas fa-home px-2"></i> Home Page</Button>
        </div>
     );
}
 
export default NotMatch;