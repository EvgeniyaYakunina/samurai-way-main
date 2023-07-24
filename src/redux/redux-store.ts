import {combineReducers, createStore} from "redux";
import {AddPostActionType, profileReducer, UpdateNewPostText} from "./profileReducer";
import {dialogReducer, SendMessage, UpdateNewMessageBody} from "./dialogsReducer";
import {sidebarReducer} from "./sidebarReducer";

type MessagesType={
    id: number
    message: string
}
type DialogType={
    id: number
    name: string
}
export type PostType={
    id: number
    message: string
    count: number
}
export type ProfilePageType={
    posts: Array<PostType>
    newPostText: string
}
export type DialogPageType={
    dialogs: Array<DialogType>
    messages: Array<MessagesType>
    newMessageBody: string

}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPages: DialogPageType
    sidebar: object
}
export type StoreType={
    _state: RootStateType
    _rerenderEntireThree:()=>void
    dispatch: (action: ActionsTypes)=> void
    subscribe: (observer: ()=>void)=> void
    getState: ()=> RootStateType
}

export type ActionsTypes =  AddPostActionType | UpdateNewPostText | UpdateNewMessageBody | SendMessage

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPages: dialogReducer,
    sidebar: sidebarReducer
});

export let store: StoreType = createStore(reducers);