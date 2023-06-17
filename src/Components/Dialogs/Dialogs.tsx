import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";


type DialogItemProps={
    name: string
    id: number
}
const DialogItem: React.FC<DialogItemProps> =(props)=>{
    let path = "/dialogs/" + props.id
    return(
        <div className={s.dialog + ' '+ s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}


type MessageProps={
    message: string
    id: number
}
const Message: React.FC<MessageProps>=(props)=>{
    return(
        <div className={s.message}>{props.message}</div>
    )
}


type DialogsProps={
    name: string
    id: number
    messages: string
}
export const Dialogs:React.FC<DialogsProps> = (props) => {
    let dialogs=[
        {id: 1, name: "Dimych"},
        {id: 2, name: "Andrey"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Victor"},
        {id: 6, name: "Valera"},
    ]
    let messages=[
        {id: 1, message: "Hi"},
        {id: 1, message: "How is your it-kamasutra?"},
        {id: 1, message: "Yo"},
        {id: 1, message: "Yo"},
        {id: 1, message: "Yo"},
    ]


    let dialogsElements = dialogs.map(d =><DialogItem name= {d.name} id ={d.id}/>);
    let messagesElements = messages.map(m => <Message message={m.message} id={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    );
}

