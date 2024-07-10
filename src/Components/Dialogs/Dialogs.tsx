import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators";
import {sendMessageAC} from "../../redux/dialogs-reducer";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/AuthRedirect";

export const Dialogs = () => {
const dialogsPages = useAppSelector(state => state.dialogsPages)
    const dispatch = useAppDispatch()
// const dialogPages = useAppSelector(state => state.dialogsPages.messages)
    let dialogsElements = dialogsPages.dialogs.map(d =><div key={d.id}><DialogItem name= {d.name} id ={d.id}/></div>);
    let messagesElements = dialogsPages.messages.map(m => <div key={m.id}><Message message={m.message} id={m.id}/></div>)

    const addNewMessage = (values: AddMessageFormType)=>{
        dispatch(sendMessageAC(values.newMessageBody))
        dispatch(reset("dialogAddMessageForm"))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
               {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

type AddMessageFormType={
    newMessageBody: string
}
const maxLength50 = maxLengthCreator(50)

const AddMessageForm = (props: InjectedFormProps<AddMessageFormType>)=> {
    return <div>
        <form onSubmit={props.handleSubmit}>
            <div><Field component={Textarea}
                        validate={[required, maxLength50]}
                        name={"newMessageBody"}
                        placeholder={"Enter your message"}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    </div>
}
const AddMessageFormRedux = reduxForm<AddMessageFormType>({
    form: "dialogAddMessageForm"
})(AddMessageForm)
export default withAuthRedirect(Dialogs)