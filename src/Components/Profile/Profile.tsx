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
    state: ProfilePageType
    addPost: (postMessage: string)=> void
}

export const Profile: React.FC<PostsType> = (props) => {
    const {...restProps}=props
    // let posts=[
    //     {id: 0, message: "Hey, how are you", count: 15},
    //     {id: 1, message: "It is my first post", count: 20},
    // ]
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={state.profilePage.posts} addPost={addPost}/>
        </div>
    )
}