import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/index.css';
import './css/style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from "redux";
import combinedReducers from "./store/reducers/combinedReducers";
import {Provider} from "react-redux"
import thunk from "redux-thunk"

const store = createStore(combinedReducers,applyMiddleware(thunk));


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
