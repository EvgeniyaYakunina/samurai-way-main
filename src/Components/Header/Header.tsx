import React from "react"
import s from './Header.module.css'
import {Link} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../redux/redux-store"
import {selectCurrentUserLogin, selectIsAuth} from "./headerSelectors"
import {logoutTC} from "../../redux/auth-reducer"
import {Avatar, Button, Col, Layout, Menu, Row} from "antd"
import {UserOutlined} from '@ant-design/icons'

export const Header = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const login = useAppSelector(selectCurrentUserLogin)
    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    const {Header} = Layout
    return (
        <Header className={s.header}>
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
                    </Menu>
                </Col>

                {isAuth
                    ? <> <Col span={1}>
                        <Avatar alt={login || ''} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                    </Col>
                        <Col span={5}>
                            <span style={{color: 'white'}}>{login}</span>
                            <Button onClick={logoutHandler}>Log out</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>}

            </Row>

        </Header>
    )
}
// <img src="https://petshop-vrn.ru/wp-content/uploads/d/8/5/d85625e65db0efed5242d18fdd6b537d.jpeg" alt=""/>
//
// <div className={s.loginBlock}>
//     {isAuth
//         ? <div>{login}
//             <button onClick={logoutHandler}>Log out</button>
//         </div>
//         : <NavLink to={'/login'}>Login</NavLink>}
// </div>