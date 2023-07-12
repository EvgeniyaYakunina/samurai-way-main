import React from "react";
import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {addPost, ProfilePageType, state} from "../../redux/state";


export type ProfileType={
    id: number
    message: string
    count: number
}

export type PostsType={
    // state: ProfilePageType
    profilePage: ProfilePageType
    addPost: (postMessage: string)=> void
    updateNewPostText: (newText: string)=> void
}

export const Profile: React.FC<PostsType> = (props) => {
    const {profilePage,updateNewPostText,
        // newPostText,
        ...restProps}=props
    // let posts=[
    //     {id: 0, message: "Hey, how are you", count: 15},
    //     {id: 1, message: "It is my first post", count: 20},
    // ]
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={profilePage.posts}
                     newPostText={profilePage.newPostText}
                     updateNewPostText={updateNewPostText}
                     addPost={addPost}/>
        </div>
    )
}