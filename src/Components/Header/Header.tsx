import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

type HeadersPropsType ={
    isAuth: boolean
    login: string | null
    logout: ()=> void
    // getAuthUserDataTC: ()=> void
}
export const Header = (props: HeadersPropsType) => {
    return (
        <header className={s.header}>
            <img src="https://petshop-vrn.ru/wp-content/uploads/d/8/5/d85625e65db0efed5242d18fdd6b537d.jpeg" alt=""/>

            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}