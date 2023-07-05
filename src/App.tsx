import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {RootStateType} from "./redux/state";
import {state} from "./redux/state";

export type AppPropsType= {
    state: RootStateType;
}
 const App:React.FC<AppPropsType> =(props)=> {
     const {state,...restProps}=props
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>

                    <Route  path='/dialogs' render={()=> <Dialogs state={state.dialogsPages}/>}/>
                    <Route path='/profile' render={()=> <Profile state={state.profilePage}/>}/>
                    {/*<Route path='/news' component={News}/>*/}
                    {/*<Route path='/music' component={Music}/>*/}
                    {/*<Route path='/settings' component={Settings}/>*/}

                </div>

            </div>
        </BrowserRouter>
    );
}


export default App;
