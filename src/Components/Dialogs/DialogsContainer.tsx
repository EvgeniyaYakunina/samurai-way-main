import React from 'react';
import { sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {StoreType} from "../../redux/redux-store";
import {StoreContext} from "../../StoreContext";


export type DialogsContainerProps={
    // store: StoreType
}

export const DialogsContainer:React.FC<DialogsContainerProps> = (props) => {
    const {
        // store,
        ...restProps}=props

    // let state = store.getState().dialogsPages;

    // let newMessageElements = useRef<HTMLTextAreaElement>(null);

    // const onSendMessageClick =()=>{
    //     store.dispatch(sendMessageAC())
    // }
    // const onNewMessageChange = (body:string)=>{
    //     // let body = e.currentTarget.value;
    //     store.dispatch(updateNewMessageBodyAC(body))
    // }

    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState().dialogsPages;
                const onSendMessageClick = () => {
                    store.dispatch(sendMessageAC())
                }
                const onNewMessageChange = (body: string) => {
                    // let body = e.currentTarget.value;
                    store.dispatch(updateNewMessageBodyAC(body))
                }

                return <Dialogs updateNewMessageBody={onNewMessageChange}
                                sendMessage={onSendMessageClick}
                                dialogsPages={state}/>
            }}
        </StoreContext.Consumer>
    )
}

