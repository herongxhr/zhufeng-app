import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
let store=createStore(reducers,applyMiddleware(logger,thunk));
window.store=store;
export default store;