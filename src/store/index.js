import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import nuReviewReducer from '../reducers/nuReviewReducer';
import errorReducer from '../reducers/errorReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({nuReview: nuReviewReducer, error: errorReducer}),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
