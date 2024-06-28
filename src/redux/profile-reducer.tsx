import {AppThunkType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType, ResultCodeEnum} from "../types/types";
import {profileAPI} from "../api/profile-api";

let initialState = {
    posts: [
        {id: 0, message: "Hey, how are you", count: 15},
        {id: 1, message: "It is my first post", count: 20},
    ] as PostType[],
    profile: {} as ProfileType,
    status: ""
}
export type InitialStateMyPostsType = typeof initialState

export const profileReducer = (state: InitialStateMyPostsType = initialState, action: ProfileActionsTypes): InitialStateMyPostsType => {

    switch (action.type) {
        case 'ADD-POST':
            const newPost = {id: 5, message: action.newPostText, count: 0}
            return {...state, posts: [...state.posts, newPost]}
        case 'SET_USER_PROFILE':
            return {...state, profile: action.profile}
        case 'SET_STATUS':
            return {...state, status: action.status}
        case 'DELETE-POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)};
        case 'SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile,photos: action.photos}as ProfileType};
        default:
            return state
    }
}

// Action Creators
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

// Thunk
export const getUserProfileTC = (userId: number): AppThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}
export const getStatusTC = (userId: number): AppThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}
export const updateStatusTC = (status: string): AppThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: File): AppThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): AppThunkType =>{
    return async (dispatch, getState) => {
        const userId = getState().auth.id
        const data = await profileAPI.saveProfile(profile)

        if (data.resultCode === ResultCodeEnum.Success) {
            if (userId != null) {
                dispatch(getUserProfileTC(userId))
            } else {
                throw new Error("userId can't be null")
            }
        } else {
            dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}))
            return Promise.reject(data.messages[0])
        }
    }
}

// types
export type ProfileActionsTypes =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof savePhotoSuccess>
