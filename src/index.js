import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';
import promiseMiddleware from 'redux-promise-middleware';
import App from './App';
import {searchReducer} from './Search';

const routesMap = { 
  HOME: '/'
};

const { reducer, middleware, enhancer } = connectRoutes(createHistory(), routesMap)

const store = createStore(combineReducers({
    location: reducer,
    search: searchReducer
}), compose(enhancer, applyMiddleware(middleware, promiseMiddleware()),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

store.dispatch({type: "START"});

registerServiceWorker();