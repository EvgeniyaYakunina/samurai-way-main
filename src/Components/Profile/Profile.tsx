import React from "react";
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";

export type PostsType={
profile: ProfileType
}

export const Profile: React.FC<PostsType> = (props) => {
    const {profile,...restProps}=props

    return (
        <div>
            <ProfileInfo profile = {profile} />
            <MyPostsContainer/>
        </div>
    )
}