import {ActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {setTotalUsersCount, setUsers, toggleIsFetching} from "./users-reducer";

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
export type UpdateNewPostText = ReturnType<typeof updateNewPostTextAC>
export type setUserProfile = ReturnType<typeof setUserProfile>

let initialState = {
    posts: [
        {id: 0, message: "Hey, how are you", count: 15},
        {id: 1, message: "It is my first post", count: 20},
    ] as PostType[],
    newPostText: "it-Kamasutra.com" as string,
    profile: {} as ProfileType
}

export type InitialStateMyPostsType = typeof initialState

export const profileReducer = (state: InitialStateMyPostsType = initialState, action: ActionsTypes ): InitialStateMyPostsType => {

    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {
                id: 5,
                message: state.newPostText,
                // action.newPostText,
                count: 0
            };
            return {...state,
                posts: [...state.posts, newPost],
                newPostText: ''};
        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {...state,newPostText: action.newText};
        }
        case 'SET_USER_PROFILE': {
            return {...state,profile: action.profile};
        }
        default:
            return state
    }
}

export const addPostAC = (newPost?: string) =>
    ({type: 'ADD-POST', newPostText: newPost})as const
export  const updateNewPostTextAC = (newText: string) => {
    return {type: 'UPDATE-NEW-POST-TEXT', newText: newText} as const}
const setUserProfile = (profile: ProfileType) => {
    return {type: 'SET_USER_PROFILE', profile} as const}

export const getUserProfileTC=(userId: number)=>{
    return (dispatch: Dispatch)=>{
        usersAPI.getProfile(userId)
            .then(response => {
               dispatch(setUserProfile(response.data))
            });
    }
}