import React, { useEffect} from 'react';
import './App.css';
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./Components/Login/Login";
import { Provider} from "react-redux";
import {initializeAppTC} from "./redux/app-reducer";
import {store, useAppDispatch, useAppSelector} from "./redux/redux-store";
import {Preloader} from "./common/Preloader/Preloader";
import {Users} from "./Components/Users/Users";
import {withSuspense} from "./hoc/WithSuspense";
import {Header} from "./Components/Header/Header";
import 'antd/dist/antd.css'
import {Breadcrumb, Layout, Menu} from 'antd'
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons'
const {SubMenu} = Menu
const {Content, Footer, Sider} = Layout
const Dialogs = React.lazy(() => import("./Components/Dialogs/Dialogs"))
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'))
//не загружает компоненту сразу полностью,т.е сборщик не собирает ее в большой бандл,а когда понадобиться ее отрисовывать,
//запрашивает ее у сервера,чтобы первый загрузочный файл не был таким большим и загружался быстрее
const SuspendedDialogs = withSuspense(Dialogs)
const SuspendedProfile = withSuspense(ProfileContainer)


export const App = () => {

    const dispatch = useAppDispatch()
    const initialized = useAppSelector(state => state.app.initialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!initialized) {
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

                        <Routes>
                            <Route path='/'
                                   element={<Navigate replace to={'/profile'}/>}/>

                            <Route path='/dialogs'
                                   element={<SuspendedDialogs/>}/>

                            <Route path='/profile/:userId?'
                                   element={<SuspendedProfile/>}/>

                            <Route path='/users'
                                   element={<Users/>}/>

                            <Route path='/login'
                                   element={<Login/>}/>

                            {/*<Route path='/chat'*/}
                            {/*       render={() => <SuspendedChatPage/>}/>*/}

                            <Route path='*'
                                   element={<div>404 NOT FOUND</div>}/>
                        </Routes>

                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>Samurai Social Network ©2020 Created by IT-KAMASUTRA</Footer>
        </Layout>
    )
}

export const SamuraiJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
}
