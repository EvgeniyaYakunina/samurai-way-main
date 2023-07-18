import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import { Route} from "react-router-dom";
import { StoreType} from "./redux/state";

export type AppPropsType= {
    store: StoreType
}
 const App:React.FC<AppPropsType> =(props)=> {
     const {store, ...restProps}=props

     const  state = store.getState();

     console.log(state.dialogsPages)
    return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>

                    <Route  path='/dialogs' render={()=> <Dialogs dialogsPages={state.dialogsPages}/>}/>
                    <Route path='/profile' render={()=> <Profile profilePage={state.profilePage}
                                                                 dispatch={store.dispatch.bind(store)}
                                                                 // addPost={store.addPost.bind(store)}
                                                                 // updateNewPostText={store.updateNewPostText.bind(store)}
                    />}/>
                    {/*<Route path='/news' component={News}/>*/}
                    {/*<Route path='/music' component={Music}/>*/}
                    {/*<Route path='/settings' component={Settings}/>*/}

                </div>

            </div>
    );
}


export default App;
