
import React from 'react';
import { render } from 'react-dom';
import Home from './views/home';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import style from'./styles/styles.css';

let initState={};
let store=createStore(rootReducer, initState, applyMiddleware(thunk));


render(
   <Provider store={store}>
     <Home />
   </Provider>
  ,
  document.querySelector('#root')
);
