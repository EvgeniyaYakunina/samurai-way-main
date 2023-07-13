import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RootStateType, state, subscribe, updateNewPostText} from "./redux/state";
import {addPost} from "./redux/state";
import {BrowserRouter} from "react-router-dom";


const rerenderEntireThree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App state = {state} addPost = {addPost} updateNewPostText={updateNewPostText}/>
        </BrowserRouter>,
        document.getElementById('root'));
}
rerenderEntireThree();
subscribe(rerenderEntireThree);