import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import { Route} from "react-router-dom";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import {StoreType} from "./redux/redux-store";
import {Users} from "./Components/Users/Users";
import {UsersContainer} from "./Components/Users/UsersContainer";

export type AppPropsType= {
    // store: StoreType
}
 const App:React.FC<AppPropsType> =(props)=> {
     const {
         // store,
         ...restProps}=props

     // const  state = store.getState();

     // console.log(state.dialogsPages)
    return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>

                    <Route  path='/dialogs' render={()=> <DialogsContainer/> }
                        // store={store}/>}
                    />
                    <Route path='/profile' render={()=> <Profile/> }
                        // store={store}/>}
                    />
                    <Route path='/users' render={()=> <UsersContainer/>}/>
                    {/*<Route path='/news' component={News}/>*/}
                    {/*<Route path='/music' component={Music}/>*/}
                    {/*<Route path='/settings' component={Settings}/>*/}

                </div>

            </div>
    );
}


export default App;
