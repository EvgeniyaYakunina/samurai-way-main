import React, {ChangeEvent, useRef} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import { sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogsReducer";
import {DialogPageType, store} from "../../redux/state";

export type DialogsProps={
    // state: StoreType
    dialogsPages: DialogPageType
    // addPost: (postMessage: string)=> void
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
    const {dialogsPages,...restProps}=props

    let dialogsElements = dialogsPages.dialogs.map(d =><div key={d.id}><DialogItem name= {d.name} id ={d.id}/></div>);
    let messagesElements = dialogsPages.messages.map(m => <div key={m.id}><Message message={m.message} id={m.id}/></div>)
    let newMessageBody = dialogsPages.newMessageBody;

    // let newMessageElements = useRef<HTMLTextAreaElement>(null);

    const onSendMessageClick =()=>{
        store.dispatch(sendMessageAC())
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>)=>{
        let body = e.currentTarget.value;
        store.dispatch(updateNewMessageBodyAC(body))
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
                <div><textarea value={newMessageBody}
                               onChange={onNewMessageChange}
                               placeholder='Enter your message'></textarea></div>
                <div><button onClick={onSendMessageClick}>Send</button></div>
            </div>
        </div>
    );
}

