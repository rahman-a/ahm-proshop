import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/lib/bootswatch/bootstrap.min.css'
import './index.css';
import App from './views/App';
import {LoginProvider} from '../src/store/userStore/login'
import {BrowserRouter as Router,} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <LoginProvider>
      <App />
    </LoginProvider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
