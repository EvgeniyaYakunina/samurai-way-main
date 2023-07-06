import React, {useRef} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogPageType, state} from "../../redux/state";

export type DialogsProps={
    state: DialogPageType
    addPost: (postMessage: string)=> void
}
// export type DialogsType={
//     id: number
//     name: string
// }
// export type MessagesType={
//     id: number
//     message: string
// }

export const Dialogs:React.FC<DialogsProps> = (props) => {
    const {...restProps}=props
    let dialogsElements = state.dialogsPages.dialogs.map(d =><DialogItem name= {d.name} id ={d.id}/>);
    let messagesElements = state.dialogsPages.messages.map(m => <Message message={m.message} id={m.id}/>)

    let newMessageElements = useRef<HTMLTextAreaElement>(null);

    const addMessage =()=>{
        if(newMessageElements.current !== null){
            alert(newMessageElements.current.value)
        }
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
               {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div>
                <button onClick={addMessage}>Add Message</button>
                <textarea ></textarea>
            </div>
        </div>
    );
}

