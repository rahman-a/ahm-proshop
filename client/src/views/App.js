import Header from '../components/Header/header'
import Footer from '../components/Footer/footer'
import {Container} from 'react-bootstrap'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Hello from proshop</h1>
        </Container>
      </main>
      <Footer />
    </div>
    
  );
}

export default App;
