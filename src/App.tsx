import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {addPost, RootStateType, updateNewPostText} from "./redux/state";
import {state} from "./redux/state";

export type AppPropsType= {
    state: RootStateType;
    addPost: (postMessage: string)=> void
    updateNewPostText: (newText: string)=> void
}
 const App:React.FC<AppPropsType> =(props)=> {
     const {state,addPost, updateNewPostText,...restProps}=props
    return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>

                    <Route  path='/dialogs' render={()=> <Dialogs state={state.dialogsPages} addPost={addPost} />}/>
                    <Route path='/profile' render={()=> <Profile profilePage={state.profilePage} addPost={addPost} updateNewPostText={updateNewPostText}/>}/>
                    {/*<Route path='/news' component={News}/>*/}
                    {/*<Route path='/music' component={Music}/>*/}
                    {/*<Route path='/settings' component={Settings}/>*/}

                </div>

            </div>
    );
}


export default App;
