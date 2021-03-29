import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from "./context/Store"

ReactDOM.render(
  <Store>
    <App />
  </Store>,
  /*<React.StrictMode>*/
 /*</React.StrictMode>,*/
  document.getElementById('root')
);