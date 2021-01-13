
import {Alert} from 'react-bootstrap'

const AlertMsg = ({type, children}) => {
    return ( 
        <Alert variant={type} style={{textAlign:'center'}}>
            {children}
        </Alert>
     );
}
 
export default AlertMsg;