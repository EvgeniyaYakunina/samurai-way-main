import {ActionsTypes, ProfilePageType} from "./redux-store";

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

let inicialState = {
    posts: [
        {id: 0, message: "Hey, how are you", count: 15},
        {id: 1, message: "It is my first post", count: 20},
    ],
    newPostText: "it-Kamasutra.com"
}

export const profileReducer = (state: ProfilePageType = inicialState, action: ActionsTypes ) => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost = {
                id: 5,
                message: state.newPostText,
                // action.newPostText,
                count: 0
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case 'UPDATE-NEW-POST-TEXT':
            state.newPostText = action.newText;
            return state;
        default:
            return state
    }
}
