import React from 'react';
import s from './Message.module.css'

type MessageProps={
    message: string
    id: number
}
export const Message=({message, id}:MessageProps)=>{

let path = "/dialogs/" + id

    return(
        <div>
        <div className={s.message}>{message}</div>
        </div>
    )
}
