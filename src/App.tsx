import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {getAuthUserDataTC} from "./redux/auth-reducer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeAppTC} from "./redux/app-reducer";
import {AppStateType, store} from "./redux/redux-store";
import {initialize} from "redux-form";
import {Preloader} from "./common/Preloader/Preloader";

type AppPropsType= MapStateToPropsType & MapDispatchToPropsType

 class App extends React.Component<AppPropsType>{
    componentDidMount() {
        this.props.initializeAppTC()
    }

     render() {
        if(!this.props.initialized){
            return <Preloader/>
        }
       return (
           <div className='app-wrapper'>
               <HeaderContainer/>
               <Navbar/>
               <div className='app-wrapper-content'>

                   <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                   <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                   <Route path='/users' render={() => <UsersContainer/>}/>
                   <Route path='/login' render={() => <Login/>}/>
                   {/*<Route path='/news' component={News}/>*/}
                   {/*<Route path='/music' component={Music}/>*/}
                   {/*<Route path='/settings' component={Settings}/>*/}

               </div>

           </div>
       );
   }
}
type MapStateToPropsType={
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeAppTC: () => void
}
const mapStateToProps=(state: AppStateType): MapStateToPropsType=>{
   return {
       initialized: state.app.initialized
   }

}

export const AppContainer = compose<React.ComponentType>(withRouter,connect(mapStateToProps, {initializeAppTC}))(App);

export const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
