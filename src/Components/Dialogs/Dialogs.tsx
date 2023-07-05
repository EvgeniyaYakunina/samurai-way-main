import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogPageType, state} from "../../redux/state";

export type DialogsProps={
    state: DialogPageType
}
export type DialogsType={
    id: number
    name: string
}
export type MessagesType={
    id: number
    message: string
}

export const Dialogs:React.FC<DialogsProps> = (props) => {
    const {...restProps}=props
    let dialogsElements = state.dialogsPages.dialogs.map(d =><DialogItem name= {d.name} id ={d.id}/>);
    let messagesElements = state.dialogsPages.messages.map(m => <Message message={m.message} id={m.id}/>)

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

