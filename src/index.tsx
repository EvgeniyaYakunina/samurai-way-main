import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/state"


const rerenderEntireThree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App store={store}
                // state = {state} addPost = {store.addPost.bind(store)} updateNewPostText={store.updateNewPostText.bind(store)}
            />
        </BrowserRouter>,
        document.getElementById('root'));
}

// const  state = store.getState();
rerenderEntireThree();
store.subscribe(rerenderEntireThree);