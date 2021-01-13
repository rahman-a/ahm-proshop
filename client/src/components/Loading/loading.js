import {Spinner} from 'react-bootstrap'

const Loading = (props) => {
    return ( 
        <div style={{textAlign:'center'}}>
            <Spinner 
            animation="border" 
            role="status" 
            variant="dark"
        >
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
        
     );
}
 
export default Loading;