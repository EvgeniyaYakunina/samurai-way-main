import {rerenderEntireThree} from "../render";

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
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPages: DialogPageType
}

export const state: RootStateType = {
    profilePage: {
        posts: [
            {id: 0, message: "Hey, how are you", count: 15},
            {id: 1, message: "It is my first post", count: 20},
        ],
        newPostText: "it-Kamasutra.com"
    },
    dialogsPages: {
        dialogs: [
            {id: 1, name: "Dimych"},
            {id: 2, name: "Andrey"},
            {id: 3, name: "Sveta"},
            {id: 4, name: "Sasha"},
            {id: 5, name: "Victor"},
            {id: 6, name: "Valera"},
        ],
        messages: [
            {id: 1, message: "Hi"},
            {id: 2, message: "How is your it-kamasutra?"},
            {id: 3, message: "Yo"},
            {id: 4, message: "Yo"},
            {id: 5, message: "Yo"},
        ]
    },
}

export let addPost = ()=>{
    let newPost ={
        id:5,
        message: state.profilePage.newPostText,
        count: 0
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireThree(state);
}
export let updateNewPostText = (newText: string)=>{
    state.profilePage.newPostText = (newText);
    rerenderEntireThree(state);
}