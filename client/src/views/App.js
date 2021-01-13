import {Redirect} from 'react-router-dom'
import Header from '../components/Header/header'
import Footer from '../components/Footer/footer'
import Home from '../views/Home/home'
import Product from './Product/product' 
import Cart from '../views/Cart/cart'
import Login from '../views/Login/login'
import Profile from '../views/Profile/profile'
import Register from '../views/Register/register'
import Checkout from '../views/Checkout/checkout'
import {Route, Switch} from 'react-router-dom'
import {ProductsProvider} from '../store/productStore/products'
import {ProductProvider} from '../store/productStore/product'
import {CartProvider} from '../store/cartStore/cart'
import {useLoginstate} from '../store/userStore/login'
import {RegisterProvider} from '../store/userStore/register'
import {UpdateUserProvider} from '../store/userStore/update'
import {Container} from 'react-bootstrap'
import NotMatch from '../components/404/404'

const App = () => {
  const {user} = useLoginstate()
  return (
    <>
        <Header />
        <main className='py-3'>
          <Container>
            <Switch>
                <Route path="/" exact>
                  <ProductsProvider>
                      <Home />
                  </ProductsProvider>
                </Route>
                <Route path="/product/:id">
                  <ProductProvider>
                      <Product />
                  </ProductProvider>
                </Route>
                <Route path='/cart/:id?'>
                  <CartProvider>
                    <Cart />
                  </CartProvider>
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/register'>
                  <RegisterProvider>
                    <Register />
                  </RegisterProvider>
                </Route>
                <Route path='/user/profile'>
                  <UpdateUserProvider>
                   {user ? <Profile /> : <Redirect to="/login"/>}
                  </UpdateUserProvider>
                </Route>
                <Route path='/checkout'>
                  <UpdateUserProvider>
                   {user ? <Checkout /> : <Redirect to="/login?redirect=checkout"/>}
                  </UpdateUserProvider>
                </Route>
                <Route path="*">
                  <NotMatch />
                </Route>
            </Switch>
          </Container>
        </main>
        <Footer />
    </>
  );
}

export default App;
