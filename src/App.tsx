import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Route} from "react-router-dom";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {Login} from "./Components/Login/Login";

export type AppPropsType= {
    // store: StoreType
}
 const App:React.FC<AppPropsType> =(props)=> {
     const {
         ...restProps}=props

     // const  state = store.getState();

     // console.log(state.dialogsPages)
    return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>

                    <Route  path='/dialogs' render={()=> <DialogsContainer/> }/>
                    <Route path='/profile/:userId?' render={()=> <ProfileContainer/> }/>
                    <Route path='/users' render={()=> <UsersContainer/>}/>
                    <Route path='/login' render={()=> <Login/>}/>
                    {/*<Route path='/news' component={News}/>*/}
                    {/*<Route path='/music' component={Music}/>*/}
                    {/*<Route path='/settings' component={Settings}/>*/}

                </div>

            </div>
    );
}


export default App;
