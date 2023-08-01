import {ActionsTypes} from "./redux-store";

type MessagesType={
    id: number
    message: string
}
type DialogType={
    id: number
    name: string
}

export type UpdateNewMessageBody= ReturnType<typeof updateNewMessageBodyAC>
export type SendMessage = ReturnType<typeof sendMessageAC>

export  const updateNewMessageBodyAC = (body: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        body: body
    } as const
}
export  const sendMessageAC = () => {
    return {
        type: 'SEND-MESSAGE',
    } as const
}

let initialState ={
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Andrey"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Victor"},
        {id: 6, name: "Valera"},
    ] as DialogType[],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is your it-kamasutra?"},
        {id: 3, message: "Yo"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"},
    ] as MessagesType[],
    newMessageBody: ""
}

export type InitialStateDialogsType = typeof initialState

export const dialogReducer = (state: InitialStateDialogsType = initialState, action: ActionsTypes): InitialStateDialogsType => {

    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY':
            state.newMessageBody = action.body;
            return state;

        case 'SEND-MESSAGE':
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push({id: 6, message: body});
            return state;
        default:
            return state
    }
}