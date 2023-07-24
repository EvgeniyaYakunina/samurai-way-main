import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/redux-store"


const rerenderEntireThree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App store={store}/>
        </BrowserRouter>,
        document.getElementById('root'));
}

// const  state = store.getState();
rerenderEntireThree();
store.subscribe(()=>{
    let state = store.getState();
    rerenderEntireThree();
});