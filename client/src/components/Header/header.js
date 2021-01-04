import style from './header.module.scss'
import {Navbar, Nav, Container} from 'react-bootstrap'

const Header = (props) => {
    return ( 
        <header className={style.header}>
           <Navbar bg="dark" variant="dark" expand="lg">
               <Container>
                    <Navbar.Brand href="/">Proshop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/cart">Cart</Nav.Link>
                            <Nav.Link href="/login">Sign in</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
               </Container>
            </Navbar>
        </header>
     );
}
 
export default Header;