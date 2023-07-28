import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/redux-store"
import {Provider, StoreContext} from "./StoreContext";


const rerenderEntireThree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
            <App
                // store={store}
            />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root'));
}

// const  state = store.getState();
rerenderEntireThree();
store.subscribe(()=>{
    let state = store.getState();
    rerenderEntireThree();
});