import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogPageType} from "../../redux/redux-store";
import {DialogsPropsType} from "./DialogsContainer";


// export type DialogsProps={
//     dialogsPages: DialogPageType
//     updateNewMessageBody: (body:string)=> void
//     sendMessage:()=>void
// }

export const Dialogs:React.FC<DialogsPropsType> = (props) => {
    const {dialogsPages,updateNewMessageBody,sendMessage,...restProps}=props

    let state = dialogsPages;

    let dialogsElements = dialogsPages.dialogs.map(d =><div key={d.id}><DialogItem name= {d.name} id ={d.id}/></div>);
    let messagesElements = dialogsPages.messages.map(m => <div key={m.id}><Message message={m.message} id={m.id}/></div>)
    let newMessageBody = dialogsPages.newMessageBody;

    // let newMessageElements = useRef<HTMLTextAreaElement>(null);

    const onSendMessageClick =()=>{
        // store.dispatch(sendMessageAC())
        sendMessage();

    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>)=>{
        let body = e.currentTarget.value;
        // store.dispatch(updateNewMessageBodyAC(body))
        updateNewMessageBody(body);
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

