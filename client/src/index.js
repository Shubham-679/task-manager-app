import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter} from 'react-router-dom';
// import {  createStore , applyMiddleware , compose } from 'redux';
import { Provider } from 'react-redux';
// import combineReducers from './reducers/index'
// import thunk from 'redux-thunk';
import { store , persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react'

// const store = createStore( combineReducers, compose(
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ))

store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <App/>
         </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
