import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

type HeadersPropsType ={
    isAuth: boolean
    login: string | null
    logout: ()=> void
}
export const Header = ({logout, isAuth, login}: HeadersPropsType) => {
    return (
        <header className={s.header}>
            <img src="https://petshop-vrn.ru/wp-content/uploads/d/8/5/d85625e65db0efed5242d18fdd6b537d.jpeg" alt=""/>

            <div className={s.loginBlock}>
                {isAuth
                    ? <div>{login} - <button onClick={logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}