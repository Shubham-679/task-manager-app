import { HashRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store , persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-datepicker/dist/react-datepicker.css';



store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
 
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
         <App/>
    </HashRouter>
         </PersistGate>
      </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
