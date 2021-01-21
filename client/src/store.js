

import { createStore , applyMiddleware , compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import combineReducers from '../src/reducers/index';



const persistConfig = {
  key: 'users',
  storage: storage,
  whitelist: ['users'] 
};

const pReducer = persistReducer(persistConfig, combineReducers);


const store = createStore( pReducer, compose(
    applyMiddleware(thunk)
    ))


const persistor = persistStore(store);

export { persistor, store };