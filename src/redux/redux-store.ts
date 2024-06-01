import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {AddPostActionType, DeletePostActionType, profileReducer, setStatus, setUserProfile} from "./profile-reducer";
import {dialogReducer, SendMessage} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {
    followSuccess,
    followingInProgress,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unfollowSuccess,
    usersReducer
} from "./users-reducer";
import {authReducer, SetUserData} from "./auth-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import {appReducer, initializedSuccess} from "./app-reducer";

export type ActionsTypes =
    |AddPostActionType
    |DeletePostActionType
    | SendMessage
    | followSuccess
    | unfollowSuccess
    | setUsers
    | setCurrentPage
    | setTotalUsersCount
    | toggleIsFetching
    | setUserProfile
    | setStatus
    |SetUserData
    |initializedSuccess
    | followingInProgress

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
     sidebar: sidebarReducer,
     auth: authReducer,
     form: formReducer,
     app: appReducer
});


export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppThunkDispatch = ThunkDispatch<AppStateType, any, AnyAction>
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AnyAction
>