import {
    InitialStateDialogsType,
    sendMessageAC,
    updateNewMessageBodyAC
} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {InitialStateAuthType} from "../../redux/auth-reducer";
import {Redirect, withRouter} from "react-router-dom";
import React, {ComponentType} from "react";
import {withAuthRedirect} from "../../hoc/AuthRedirect";


// export type DialogsContainerProps={
//     // store: StoreType
// }

type MapStateDialogsPropsType = {
    dialogsPages: InitialStateDialogsType
}

type MapStateDispatchDialogsPropsType={
    updateNewMessageBody: (body: string)=>void
    sendMessage: ()=> void
}

export type DialogsPropsType = MapStateDialogsPropsType & MapStateDispatchDialogsPropsType
// export const DialogsContainer:React.FC<DialogsContainerProps> = (props) => {
//     const {
//         // store,
//         ...restProps}=props
//
//     // let state = store.getState().dialogsPages;
//
//     // let newMessageElements = useRef<HTMLTextAreaElement>(null);
//
//     // const onSendMessageClick =()=>{
//     //     store.dispatch(sendMessageAC())
//     // }
//     // const onNewMessageChange = (body:string)=>{
//     //     // let body = e.currentTarget.value;
//     //     store.dispatch(updateNewMessageBodyAC(body))
//     // }
//
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 let state = store.getState().dialogsPages;
//                 const onSendMessageClick = () => {
//                     store.dispatch(sendMessageAC())
//                 }
//                 const onNewMessageChange = (body: string) => {
//                     // let body = e.currentTarget.value;
//                     store.dispatch(updateNewMessageBodyAC(body))
//                 }
//
//                 return <Dialogs updateNewMessageBody={onNewMessageChange}
//                                 sendMessage={onSendMessageClick}
//                                 dialogsPages={state}/>
//             }}
//         </StoreContext.Consumer>
//     )
// }

let mapStateToProps = (state: AppStateType): { dialogsPages: InitialStateDialogsType} => {
    return {
        dialogsPages: state.dialogsPages
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapStateDispatchDialogsPropsType => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyAC(body))
        },
        sendMessage: () => {
            dispatch(sendMessageAC())
        }
    }
}
export default compose<ComponentType>(connect(mapStateToProps,mapDispatchToProps),withRouter, withAuthRedirect)(Dialogs)