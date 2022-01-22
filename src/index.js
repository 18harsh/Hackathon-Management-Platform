import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import userReducerAuth from "./store/reducers/auth";
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let rootReducer = combineReducers({
    user: userReducerAuth,
});

const store = createStore(rootReducer, composeEnhances(
    applyMiddleware(thunk)
));

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);

ReactDOM.render(
    app,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
