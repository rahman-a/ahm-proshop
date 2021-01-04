import style from './footer.module.scss'
import {Container,Row, Col} from 'react-bootstrap'

const Footer = (props) => {
    return ( 
        <footer className={style.footer}>
            <Container>
                <Row>
                    <Col className="text-center">Copyright &copy; Proshop</Col>
                </Row>
            </Container>
        </footer>
     );
}
 
export default Footer;