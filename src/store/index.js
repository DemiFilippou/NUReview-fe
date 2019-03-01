import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import searchReducer from '../reducers/searchReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({search: searchReducer}), composeEnhancers(applyMiddleware(thunk)));

export default store;
