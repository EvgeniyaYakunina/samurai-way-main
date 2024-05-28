import React from "react";
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";

export type PostsType = {
    profile: ProfileType
    status: string
    updateStatusTC: (status: string) => void
}

export const Profile: React.FC<PostsType> = (props) => {
    const {profile, status, ...restProps}=props

    return (
        <div>
            <ProfileInfo profile = {profile} status={props.status} updateStatusTC={props.updateStatusTC} />
            <MyPostsContainer/>
        </div>
    )
}