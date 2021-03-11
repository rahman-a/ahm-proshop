import {Redirect} from 'react-router-dom'
import Header from '../components/Header/header'
import Footer from '../components/Footer/footer'
import Home from '../views/Home/home'
import Product from './Product/product' 
import Cart from '../views/Cart/cart'
import Login from '../views/Login/login'
import Profile from '../views/Profile/profile'
import Register from '../views/Register/register'
import Shipping from '../views/Shipping/shipping'
import Payment from '../views/Payment/payment'
import Order from '../views/Order/order'
import AdminUsers from '../views/Admin/Users/users'
import AdminUserInfo from '../views/Admin/Users/userInfo'
import AdminProducts from '../views/Admin/Products/products'
import AdminOrders from '../views/Admin/Orders/orders'
import EditProduct from '../views/Admin/Products/editProduct'
import CreateProduct from '../views/Admin/Products/createProduct'
import {Route, Switch} from 'react-router-dom'
import {ProductsProvider} from '../store/productStore/products'
import {ProductProvider} from '../store/productStore/product'
import {CartProvider} from '../store/cartStore/cart'
import {useLoginstate} from '../store/userStore/login'
import {RegisterProvider} from '../store/userStore/register'
import {UpdateUserProvider} from '../store/userStore/update'
import {OrderProvider} from '../store/orderStore/order'
import {UsersIndexProvider} from '../store/userStore/allUsersIndex'
import {UserDeleteProvider} from '../store/userStore/deleteUser'
import {UserProvider} from '../store/userStore/userInfo'
import {UpdateProductProvider} from '../store/productStore/update'
import {CreateProductProvider} from '../store/productStore/create'
import {IndexOrdersProvider} from '../store/orderStore/ordersIndex'
import {CreateReviewProvider} from '../store/productStore/review'
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
                  <CreateReviewProvider>
                    <ProductProvider>
                        <Product />
                    </ProductProvider>
                  </CreateReviewProvider>
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
                <Route path='/shipping'>
                   {user 
                   ? <Shipping/>
                   : <Redirect to="/login?redirect=shipping"/>}
                </Route>
                <Route path='/payment'>
                   {user 
                   ? <CartProvider> <Payment/> </CartProvider>
                   : <Redirect to="/login?redirect=shipping"/>}
                </Route>
                <Route path='/order/:id'>
                   {user 
                   ?<OrderProvider><Order/></OrderProvider>
                   : <Redirect to="/login?redirect=shipping"/>}
                </Route>
                <Route path='/admin/users/:id'>
                   {user && user.user.isAdmin 
                   ? <UserProvider> 
                     <AdminUserInfo /> 
                    </UserProvider>
                  : <NotMatch />}
                </Route>
                <Route path='/admin/users'>
                  {user && user.user.isAdmin 
                  ?  <UserDeleteProvider>
                      <UsersIndexProvider> <AdminUsers /> </UsersIndexProvider>
                    </UserDeleteProvider> 
                  : <NotMatch />}
                </Route>
                <Route path='/admin/products/new'>
                  {user && user.user.isAdmin 
                  ?  <CreateProductProvider> <CreateProduct /> </CreateProductProvider>
                  : <NotMatch />}
                </Route>
                <Route path='/admin/products/:id'>
                  {user && user.user.isAdmin 
                  ? <ProductProvider>
                    <UpdateProductProvider>
                      <EditProduct />
                    </UpdateProductProvider>
                  </ProductProvider> 
                  : <NotMatch />}
                </Route>
                <Route path='/admin/products'>
                  {user && user.user.isAdmin 
                  ? <ProductsProvider> 
                      <AdminProducts /> 
                    </ProductsProvider>
                  : <NotMatch />}
                </Route>
                <Route path='/admin/orders'>
                  {user && user.user.isAdmin 
                  ?   <IndexOrdersProvider> <AdminOrders /> </IndexOrdersProvider>
                  : <NotMatch />}
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
