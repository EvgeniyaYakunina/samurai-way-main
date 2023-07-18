import React from "react";
import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, ProfilePageType} from "../../redux/state";


export type ProfileType={
    id: number
    message: string
    count: number
}

export type PostsType={
    // state: ProfilePageType
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes)=> void
    // addPost: (postMessage: string)=> void
    // updateNewPostText: (newText: string)=> void
}

export const Profile: React.FC<PostsType> = (props) => {
    const {profilePage, dispatch, ...restProps}=props

    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={profilePage.posts}
                     newPostText={profilePage.newPostText}
                     dispatch={dispatch}
                     // updateNewPostText={updateNewPostText}
                     // addPost={addPost}
            />
        </div>
    )
}