import React from 'react';
import './App.css';
import {Navbar} from "./Components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
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
//не загружает компоненту сразу полностью,т.е сборщик не собирает ее в большой бандл,а когда понадобиться ее отрисовывать,
//запрашивает ее у сервера,чтобы первый загрузочный файл не был таким большим и загружался быстрее

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
                   <Switch>
                       {/*<Route path='/' render={() => <Redirect to={'/profile'}/>}/>*/}
                       <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                       <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                       <Route path='/users' render={() => <UsersContainer/>}/>
                       <Route path='/login' render={() => <Login/>}/>
                       <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                       {/*<Route path='/news' component={News}/>*/}
                       {/*<Route path='/music' component={Music}/>*/}
                       {/*<Route path='/settings' component={Settings}/>*/}
                   </Switch>
               </div>

           </div>
       );
   }
}
//Switch идет свкрху вниз по роутам и отрисовывает первый, который удовлетворяет запрос
//таже можно использовать exact( <Route exact path='/login' render={() => <Login/>}/>), который отрисовывается при полном совпадении url
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
// compose один за другим применяет HOC
// HOC - это функция, которая принимает одну компоненту и возвращает другую компоненту (контейнерную компоненту над входящей компонентой),
// чтобы передать ей какие-то способности и props
// withRouter тоже создает контейнерную компоненту, в которую передает данные из url и routing

export const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
//Provider являясь родителем для всех компонент в AppContainer кладет в глобальный контекст store
// и любая компонента может стать потребителем этого стора, доставать его самостоятельно, нет необходимости прокидывать его вручную