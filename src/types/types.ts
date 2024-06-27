import {AppActionsTypes} from "../redux/app-reducer";
import {DialogsActionsTypes} from "../redux/dialogs-reducer";
import {UsersActionsTypes} from "../redux/users-reducer";
import {ProfileActionsTypes} from "../redux/profile-reducer";
import {AuthActionsTypes} from "../redux/auth-reducer";

export type PhotosType = {
    small: string | null
    large: string | null
}
export type UserType = {
    id: number
    photos: PhotosType
    followed: boolean
    name: string
    status: string
    location: LocationType
}
type LocationType = {
    city: string
    country: string
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type MessagesType={
    id: number
    message: string
}
export type DialogType={
    id: number
    name: string
}
export type PostType = {
    id: number
    message: string
    count: number
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}
export type ErrorType = {
    statusCode: number
    messages: [{
        message: string
        field: string
    }],
    error: string
}
export type ActionsTypes =
    | DialogsActionsTypes
    | UsersActionsTypes
    | ProfileActionsTypes
    | AuthActionsTypes
    | AppActionsTypes

export type BaseResponseType<D = {}> = {
    resultCode: ResultCodeEnum
    messages: string[]
    fieldsErrors: string[]
    data: D
}
export type MeResponseType = {
    id: number
    email: string
    login: string
}
 export enum ResultCodeEnum{
    Success = 0,
    Error = 1,
   CaptchaIsRequired = 10
}

// export type ProfilePageType={
//     posts: Array<PostType>
//     newPostText: string
// }
// export type DialogPageType={
//     dialogs: Array<DialogType>
//     messages: Array<MessagesType>
//     newMessageBody: string
//
// }
// export type RootStateType = {
//     profilePage: ProfilePageType
//     dialogsPages: DialogPageType
//     sidebar: object
// }


// export type StoreType={
//     _state: RootStateType
//     _rerenderEntireThree:()=>void
//     dispatch: (action: ActionsTypes)=> void
//     subscribe: (observer: ()=>void)=> void
//     getState: ()=> RootStateType
// }