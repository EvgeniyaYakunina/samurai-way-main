import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='/dialogs' activeClassName={s.active}>Messages</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='/users' activeClassName={s.active}>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/news'>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/music'>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/settings'>Settings</NavLink>
            </div>
        </nav>
    )
}