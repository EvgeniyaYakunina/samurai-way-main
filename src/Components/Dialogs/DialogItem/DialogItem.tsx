import React from 'react';
import s from './DialogItem.module.css'
import {NavLink} from "react-router-dom";


type DialogItemProps={
    name: string
    id: number
}
export const DialogItem = ({name, id}: DialogItemProps)=>{
    let path = "/dialogs/" + id
    return(
        <div className={s.dialog + ' '+ s.active}>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )
}

