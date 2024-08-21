

//////////////////////////////

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
//Redux
//import store from './app/store';
import  {Provider, useDispatch, useSelector, connect}  from 'react-redux';
import { legacy_createStore as createStore } from "redux";
//import { configureStore } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './commponents/reducers/index';


// Route
import { BrowserRouter } from 'react-router-dom'



// Antd
//import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
//const store = createStore()
//const store = configureStore()
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer,composeWithDevTools());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  //</React.StrictMode>
);


