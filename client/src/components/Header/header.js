import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {useLoginDispatch, useLoginstate} from '../../store/userStore/login'
import {userLogout} from '../../store/userStore/action'
import {useHistory} from 'react-router-dom'
import SearchBox from '../SearchBox/searchBox'

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
        <header>
           <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
               <Container>
               <LinkContainer to="/">
                    <Navbar.Brand>Proshop</Navbar.Brand>
               </LinkContainer>
               <SearchBox />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            {user 
                            ? <NavDropdown title={user.user.name} id="nav-dropdown">
                                <NavDropdown.Item eventKey="4.1" onSelect={getUserProfile}>Profile</NavDropdown.Item>
                                {user.user.isAdmin && <NavDropdown.Item eventKey="4.2" className="admin-nav">Admin
                                    <Nav className="flex-column side-nav">
                                        <LinkContainer to='/admin/dashboard'>
                                            <Nav.Link eventKey="link-1" className='side-nav__link'>
                                            <i className="fas fa-tachometer-alt px-2"></i>Dashboard
                                            </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/dashboard'>
                                            <Nav.Link eventKey="link-1" className='side-nav__link'>
                                            <i className="fas fa-calculator px-2"></i>Stats
                                            </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/users'>
                                            <Nav.Link eventKey="link-1" className='side-nav__link'>
                                                <i className="fas fa-users px-2"></i>Users
                                            </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/products'>
                                            <Nav.Link eventKey="link-2" className='side-nav__link'>
                                            <i className="fab fa-product-hunt px-2"></i>Products
                                            </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orders'>
                                            <Nav.Link eventKey="link-3" className='side-nav__link'>
                                            <i class="fas fa-shipping-fast px-2"></i>Orders
                                            </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orders'>
                                            <Nav.Link eventKey="link-3" className='side-nav__link'>
                                            <i className="fas fa-list-alt px-2"></i>Categories
                                            </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orders'>
                                            <Nav.Link eventKey="link-3" className='side-nav__link'>
                                            <i className="fas fa-copyright px-2"></i>Brands
                                            </Nav.Link>
                                        </LinkContainer>
                                    </Nav>
                                </NavDropdown.Item>}
                                <NavDropdown.Item eventKey="4.3" onSelect={userLogoutHandler}>logout</NavDropdown.Item>
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