import {combineReducers, createStore} from "redux";
import {AddPostActionType, profileReducer, UpdateNewPostText} from "./profileReducer";
import {dialogReducer, SendMessage, UpdateNewMessageBody} from "./dialogsReducer";
import {sidebarReducer} from "./sidebarReducer";
import {follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unfollow, usersReducer} from "./usersReducer";

export type ActionsTypes =  AddPostActionType | UpdateNewPostText | UpdateNewMessageBody | SendMessage |
    follow | unfollow | setUsers | setCurrentPage | setTotalUsersCount | toggleIsFetching

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


 let rootReducer = combineReducers({
     profilePage: profileReducer,
     dialogsPages: dialogReducer,
     usersPage: usersReducer,
     sidebar: sidebarReducer
});


export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// window.store = store;