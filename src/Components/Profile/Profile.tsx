import React from "react";
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";

export type PostsType = {
    profile: ProfileType
    status: string
    updateStatusTC: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

export const Profile = ({profile, status, isOwner, updateStatusTC, savePhoto, ...restProps}: PostsType) => {

    return (
        <div>
            <ProfileInfo  savePhoto={savePhoto} isOwner={isOwner} profile = {profile} status={status} updateStatusTC={updateStatusTC} />
            <MyPostsContainer/>
        </div>
    )
}