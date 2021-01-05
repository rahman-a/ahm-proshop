import Header from '../components/Header/header'
import Footer from '../components/Footer/footer'
import Home from '../views/Home/home'
import Product from './Product/product' 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Container} from 'react-bootstrap'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/product/:id">
              <Product />
            </Route>
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
    
  );
}

export default App;
