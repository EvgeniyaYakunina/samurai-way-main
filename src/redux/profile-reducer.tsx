import {ActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";

export type PostType={
    id: number
    message: string
    count: number
}

export type ProfileType ={
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    profile: ProfileType
}


export type AddPostActionType = ReturnType<typeof addPostAC>
export type setUserProfile = ReturnType<typeof setUserProfile>
export type setStatus = ReturnType<typeof setStatus>

let initialState = {
    posts: [
        {id: 0, message: "Hey, how are you", count: 15},
        {id: 1, message: "It is my first post", count: 20},
    ] as PostType[],
    profile: {} as ProfileType,
    status: ""
}

export type InitialStateMyPostsType = typeof initialState

export const profileReducer = (state: InitialStateMyPostsType = initialState, action: ActionsTypes ): InitialStateMyPostsType => {

    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {
                id: 5,
                message: action.newPostText,
                count: 0
            };
            return {...state,
                posts: [...state.posts, newPost],
            };
        }
        case 'SET_USER_PROFILE': {
            return {...state,profile: action.profile};
        }
        case 'SET_STATUS': {
            return {...state,status: action.status};
        }
        default:
            return state
    }
}

export const addPostAC = (newPost: string) =>
    ({type: 'ADD-POST', newPostText: newPost})as const

const setUserProfile = (profile: ProfileType) => {
    return {type: 'SET_USER_PROFILE', profile} as const}

const setStatus = (status: string) => {
    return {type: 'SET_STATUS', status} as const}

export const getUserProfileTC=(userId: number)=>{
    return (dispatch: Dispatch)=>{
        profileAPI.getProfile(userId)
            .then(response => {
               dispatch(setUserProfile(response.data))
            });
    }
}
export const getStatusTC=(userId: number)=>{
    return (dispatch: Dispatch)=>{
        profileAPI.getStatus(userId)
            .then(response => {
               dispatch(setStatus(response.data))
            });
    }
}
export const updateStatusTC=(status: string)=>{
    return (dispatch: Dispatch)=>{
        profileAPI.updateStatus(status)
            .then(response => {
                if(response.data.resultCode === 0){
                    dispatch(setStatus(status))
                }
            });
    }
}