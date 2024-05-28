import {InitialStateDialogsType, sendMessageAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withRouter} from "react-router-dom";
import {ComponentType} from "react";
import {withAuthRedirect} from "../../hoc/AuthRedirect";

type MapStateDialogsPropsType = {
    dialogsPages: InitialStateDialogsType
    newMessageBody: string
}

type MapStateDispatchDialogsPropsType={
    sendMessage: (newMessageBody: string)=> void
}

export type DialogsPropsType = MapStateDialogsPropsType & MapStateDispatchDialogsPropsType

let mapStateToProps = (state: AppStateType): { dialogsPages: InitialStateDialogsType} => {
    return {
        dialogsPages: state.dialogsPages
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapStateDispatchDialogsPropsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageAC(newMessageBody))
        }
    }
}
export default compose<ComponentType>(connect(mapStateToProps,mapDispatchToProps),withRouter, withAuthRedirect)(Dialogs)