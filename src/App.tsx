import React from 'react';
import './App.css';
import {Navbar} from "./Components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeAppTC} from "./redux/app-reducer";
import {AppStateType, store} from "./redux/redux-store";
import {Preloader} from "./common/Preloader/Preloader";
import UsersContainer from "./Components/Users/UsersContainer";
import {withSuspense} from "./hoc/WithSuspense";

const DialogsContainer = React.lazy(() => import("./Components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'))

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

                   <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                   <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
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
