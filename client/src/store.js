import { createStore , applyMiddleware } from 'redux';
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


const store = createStore( pReducer,applyMiddleware(thunk))


const persistor = persistStore(store);

export { persistor, store };