import {ActionsTypes} from "./redux-store";

type MessagesType={
    id: number
    message: string
}
type DialogType={
    id: number
    name: string
}

export type SendMessage = ReturnType<typeof sendMessageAC>


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
    // newMessageBody: ""
}

export type InitialStateDialogsType = typeof initialState

export const dialogReducer = (state: InitialStateDialogsType = initialState, action: ActionsTypes): InitialStateDialogsType => {

    switch (action.type) {
        case 'SEND-MESSAGE':
            let body = action.newMessageBody;
            return {...state,
                messages: [...state.messages, {id: 6, message: body}]}
        default:
            return state
    }
}

export  const sendMessageAC = (newMessageBody: string) => {
    return {
        type: 'SEND-MESSAGE', newMessageBody
    } as const
}