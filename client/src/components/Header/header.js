import style from './header.module.scss'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {useLoginDispatch, useLoginstate} from '../../store/userStore/login'
import {userLogout} from '../../store/userStore/action'
import {useHistory} from 'react-router-dom'

const Header = (props) => {
    const {user} = useLoginstate()
    const dispatch = useLoginDispatch()
    const history = useHistory()
    
    const getUserProfile = () =>{
        history.push('/user/profile')
    }
    const userLogoutHandler = () =>{
       userLogout(dispatch)
    }
    return ( 
        <header className={style.header}>
           <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
               <Container>
               <LinkContainer to="/">
                    <Navbar.Brand>Proshop</Navbar.Brand>
               </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            {user 
                            ? <NavDropdown title={user.user.name} id="nav-dropdown">
                                <NavDropdown.Item eventKey="4.1" onSelect={getUserProfile}>Profile</NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.2" onSelect={userLogoutHandler}>logout</NavDropdown.Item>
                            </NavDropdown>
                            :<LinkContainer to="/login">
                            <Nav.Link href="/login"><i className="fas fa-user"></i> Sign in</Nav.Link>
                        </LinkContainer>}
                            
                        </Nav>
                    </Navbar.Collapse>
               </Container>
            </Navbar>
        </header>
     );
}
 
export default Header;