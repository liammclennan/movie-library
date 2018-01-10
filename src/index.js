import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import {searchReducer} from './Search';

function routingReducer(state = { }, action) {
    switch (action.type) {
        default: return state;
    }
}
const store = createStore(combineReducers({
    routing: routingReducer,
    search: searchReducer
}));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

store.dispatch({type: "START"});

registerServiceWorker();