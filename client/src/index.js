import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import {Store} from './Store';
import { Provider } from 'react-redux'
import {Counter} from './Counter';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
      {/* <Provider store={Store}> */}
    <App />
  {/* </Provider> */}
    </React.StrictMode>
);