import React, {ChangeEvent} from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import {ProfileStatus} from "./ProfileStatus";
import userPhoto from '../../../assets/images/userIcon.png'

type ProfileInfoType={
    profile: ProfileType
    status: string
    updateStatusTC: (status: string)=> void
    isOwner: boolean
    savePhoto: (file: File) => void
}

export const ProfileInfo = ({profile, isOwner, status, updateStatusTC, savePhoto}: ProfileInfoType) => {
    if (!profile){
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }
    return (
        <div>
            <div>
                <img src="https://www.shutterstock.com/image-photo/brooklyn-bridge-panorama-sunset-260nw-319481531.jpg"
                     alt=""/>
                <div className={s.descriptionBlock}>
                    <img src={profile?.photos?.large || userPhoto} className={s.mainPhoto}/>
                    {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                    <ProfileStatus status={status} updateStatusTC={updateStatusTC}/>
                </div>
            </div>
        </div>
    )
}