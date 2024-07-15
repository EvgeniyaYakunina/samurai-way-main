import {AppThunkType} from "./redux-store"
import {Dispatch} from "redux"
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/api-chat"
import {v1} from "uuid"

type ChatMessageType = ChatMessageAPIType & {id: string}
export type InitialStateType = typeof initialState

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case 'STATUS_CHANGED':
            return {...state, status: action.payload.status}
        default:
            return state
    }
}

// export const actions = {
//     messagesReceived: (messages: ChatMessageAPIType[]) => ({
//         type: 'SN/chat/MESSAGES_RECEVIED', payload: {messages}
//     } as const),
//     statusChanged: (status: StatusType) => ({
//         type: 'SN/chat/STATUS_CHANGED', payload: {status}
//     } as const)
// }

// actions
export const messagesReceived = (messages: ChatMessageAPIType[]) => ({
    type: 'MESSAGES_RECEIVED', payload: {messages}} as const)

export const statusChanged = (status: StatusType) => ({
    type: 'STATUS_CHANGED', payload: {status}} as const)

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChanged(status))
        }
    }
    return _statusChangedHandler
}

// thunks
export const startMessagesListening = (): AppThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

}
export const stopMessagesListening = (): AppThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): AppThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatReducer

//types
type ActionsType =
    |ReturnType<typeof messagesReceived>
    |ReturnType<typeof statusChanged>
// type ThunkType = BaseThunkType<ActionsType | FormAction>