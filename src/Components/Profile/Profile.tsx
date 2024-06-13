import React from "react";
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

export type PostsType = {
    profile: ProfileType
    status: string
    updateStatusTC: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

export const Profile = ({profile, status, isOwner, updateStatusTC, savePhoto, saveProfile, ...restProps}: PostsType) => {

    return (
        <div>
            <ProfileInfo  saveProfile={saveProfile} savePhoto={savePhoto} isOwner={isOwner} profile = {profile} status={status} updateStatusTC={updateStatusTC} />
            <MyPostsContainer/>
        </div>
    )
}