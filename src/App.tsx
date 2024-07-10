import React, {ComponentType} from 'react';
import './App.css';
import {BrowserRouter, Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {Login} from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeAppTC} from "./redux/app-reducer";
import {AppStateType, store} from "./redux/redux-store";
import {Preloader} from "./common/Preloader/Preloader";
import {UsersContainer} from "./Components/Users/UsersContainer";
import {withSuspense} from "./hoc/WithSuspense";
import {RequestStatusType} from "./types/types";
import {Header} from "./Components/Header/Header";
import 'antd/dist/antd.css'
import {Breadcrumb, Layout, Menu} from 'antd'
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons'


const {SubMenu} = Menu
const {Content, Footer, Sider} = Layout
const DialogsContainer = React.lazy(() => import("./Components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'))
//не загружает компоненту сразу полностью,т.е сборщик не собирает ее в большой бандл,а когда понадобиться ее отрисовывать,
//запрашивает ее у сервера,чтобы первый загрузочный файл не был таким большим и загружался быстрее
const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
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
           <Layout>
               <Header/>
               <Content style={{padding: '0 50px'}}>
                   <Breadcrumb style={{margin: '16px 0'}}>
                       <Breadcrumb.Item>Home</Breadcrumb.Item>
                       <Breadcrumb.Item>List</Breadcrumb.Item>
                       <Breadcrumb.Item>App</Breadcrumb.Item>
                   </Breadcrumb>
                   <Layout className={'site-layout-background'} style={{padding: '24px 0'}}>
                       <Sider className={'site-layout-background'} width={200}>
                           <Menu
                               mode={'inline'}
                               /*  defaultSelectedKeys={['7']}*/
                               /*  defaultOpenKeys={['sub1']}*/
                               style={{height: '100%'}}
                           >
                               <SubMenu key={'sub1'} icon={<UserOutlined/>} title={"My Profile"}>
                                   <Menu.Item key={"1"}> <Link to="/profile">Profile</Link></Menu.Item>
                                   <Menu.Item key={"2"}> <Link to="/dialogs">Messages</Link></Menu.Item>
                                   <Menu.Item key={"3"}>option3</Menu.Item>
                                   <Menu.Item key={"4"}>option4</Menu.Item>
                               </SubMenu>
                               <SubMenu key={"sub2"} icon={<LaptopOutlined/>} title={"Developers"}>
                                   <Menu.Item key={"5"}><Link to="/users">Developers</Link></Menu.Item>
                                   <Menu.Item key={"6"}>option6</Menu.Item>
                                   <Menu.Item key={"7"}>option7</Menu.Item>
                                   <Menu.Item key={"8"}>option8</Menu.Item>
                               </SubMenu>
                               <SubMenu key={"sub3"} icon={<NotificationOutlined/>} title={"subnav 3"}>
                                   <Menu.Item key={"9"}><Link to="/chat">Chat</Link></Menu.Item>
                                   <Menu.Item key={"10"}>option10</Menu.Item>
                                   <Menu.Item key={"11"}>option11</Menu.Item>
                                   <Menu.Item key={"12"}>option12</Menu.Item>
                               </SubMenu>
                           </Menu>
                       </Sider>
                       <Content style={{padding: '0 24px', minHeight: 280}}>

                           <Switch>
                               <Route exact path='/'
                                      render={() => <Redirect to={'/profile'}/>}/>

                               <Route path='/dialogs'
                                      render={() => <SuspendedDialogs/>}/>

                               <Route path='/profile/:userId?'
                                      render={() => <SuspendedProfile/>}/>

                               <Route path='/users'
                                      render={() => <UsersContainer //pageTitle={'Самураи'}
                                              />}/>

                               <Route path='/login'
                                      render={() => <Login/>}/>

                               {/*<Route path='/chat'*/}
                               {/*       render={() => <SuspendedChatPage/>}/>*/}

                               <Route path='*'
                                      render={() => <div>404 NOT FOUND</div>}/>
                           </Switch>

                       </Content>
                   </Layout>
               </Content>
               <Footer style={{textAlign: 'center'}}>Samurai Social Network ©2020 Created by IT-KAMASUTRA</Footer>
           </Layout>

           // <div className='app-wrapper'>
           //     <Header/>
           //     {/*{this.props.status === 'loading' ? <LinearProgress color="primary"/> : ''}*/}
           //     <Navbar/>
           //     <div className='app-wrapper-content'>
           //         <Switch>
           //             <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
           //             <Route path='/dialogs' render={()=><SuspendedDialogs/>}/>
           //             <Route path='/profile/:userId?' render={()=> <SuspendedProfile/>}/>
           //             <Route path='/users' render={() => <UsersContainer/>}/>
           //             <Route path='/login' render={() => <Login/>}/>
           //             <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
           //             {/*<Route path='/news' component={News}/>*/}
           //             {/*<Route path='/music' component={Music}/>*/}
           //             {/*<Route path='/settings' component={Settings}/>*/}
           //         </Switch>
           //     </div>
           //
           // </div>
       )
   }
}
//Switch идет свкрху вниз по роутам и отрисовывает первый, который удовлетворяет запрос
//таже можно использовать exact( <Route exact path='/login' render={() => <Login/>}/>), который отрисовывается при полном совпадении url
type MapStateToPropsType={
    initialized: boolean
    status: RequestStatusType
}
type MapDispatchToPropsType = {
    initializeAppTC: () => void
}
const mapStateToProps=(state: AppStateType): MapStateToPropsType=>{
   return {
       initialized: state.app.initialized,
       status: state.app.status
   }

}

export const AppContainer = compose<ComponentType>(withRouter,connect(mapStateToProps, {initializeAppTC}))(App);
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