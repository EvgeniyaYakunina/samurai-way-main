import {ActionsTypes} from "./redux-store";

export type PostType={
    id: number
    message: string
    count: number
}
export type ProfilePageType={
    posts: Array<PostType>
    newPostText: string
}


export type AddPostActionType = ReturnType<typeof addPostAC>
export type UpdateNewPostText = ReturnType<typeof updateNewPostTextAC>

export const addPostAC = (newPost?: string) => ({
    type: 'ADD-POST',
    newPostText: newPost
})as const
export  const updateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: newText
    } as const
}

let initialState = {
    posts: [
        {id: 0, message: "Hey, how are you", count: 15},
        {id: 1, message: "It is my first post", count: 20},
    ] as PostType[],
    newPostText: "it-Kamasutra.com" as string
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
        default:
            return state
    }
}
