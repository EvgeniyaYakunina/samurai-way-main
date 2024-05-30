import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppContainer} from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/redux-store"
import {Provider} from "react-redux";


    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
            <AppContainer/>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root'));

// const  state = store.getState();
// rerenderEntireThree();
// store.subscribe(()=>{
//     let state = store.getState();
//     rerenderEntireThree();
// });