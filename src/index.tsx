import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {SamuraiJSApp} from "./App";




    // ReactDOM.render(
    //     <BrowserRouter>
    //         <Provider store={store}>
    //         <AppContainer/>
    //         </Provider>
    //     </BrowserRouter>,
    //     document.getElementById('root'));

ReactDOM.render(<SamuraiJSApp/>,
    document.getElementById('root'));

// const  state = store.getState();
// rerenderEntireThree();
// store.subscribe(()=>{
//     let state = store.getState();
//     rerenderEntireThree();
// });