import {ActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";

export type PostType = {
    id: number
    message: string
    count: number
}

export type ProfileType = {
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

export type PhotosType = {
    small: string | null
    large: string | null
}


export type AddPostActionType = ReturnType<typeof addPostAC>
export type setUserProfile = ReturnType<typeof setUserProfile>
export type setStatus = ReturnType<typeof setStatus>
export type DeletePostActionType = ReturnType<typeof deletePostAC>
export type savePhotoSuccess = ReturnType<typeof savePhotoSuccess>


let initialState = {
    posts: [
        {id: 0, message: "Hey, how are you", count: 15},
        {id: 1, message: "It is my first post", count: 20},
    ] as PostType[],
    profile: {} as ProfileType,
    status: ""
}

export type InitialStateMyPostsType = typeof initialState

export const profileReducer = (state: InitialStateMyPostsType = initialState, action: ActionsTypes): InitialStateMyPostsType => {

    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {
                id: 5,
                message: action.newPostText,
                count: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case 'SET_USER_PROFILE': {
            return {...state, profile: action.profile};
        }
        case 'SET_STATUS': {
            return {...state, status: action.status};
        }
        case 'DELETE-POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)};
        }
        case 'SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile,photos: action.photos}as ProfileType};
        }
        default:
            return state
    }
}

export const addPostAC = (newPost: string) =>
    ({type: 'ADD-POST', newPostText: newPost}) as const

export const deletePostAC = (id: number) =>
    ({type: 'DELETE-POST', postId: id}) as const

export const setUserProfile = (profile: ProfileType) => {
    return {type: 'SET_USER_PROFILE', profile} as const
}

export const setStatus = (status: string) => {
    return {type: 'SET_STATUS', status} as const
}
export const savePhotoSuccess = (photos: PhotosType) => {
    return {type: 'SAVE_PHOTO_SUCCESS', photos} as const
}

export const getUserProfileTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const getStatusTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
    let response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}