import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import {ProfileStatus} from "./ProfileStatus";
import userPhoto from '../../../assets/images/userIcon.png'
import {ProfileDataFormReduxForm} from "./ProfileDataForm";
import {ProfileData} from "./ProfileData";

type ProfileInfoType={
    profile: ProfileType
    status: string
    updateStatusTC: (status: string)=> void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

export const ProfileInfo = ({profile, isOwner, status, updateStatusTC, savePhoto, saveProfile}: ProfileInfoType) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile){
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }
    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }
    return (
        <div>
            <div>
                <img src="https://www.shutterstock.com/image-photo/brooklyn-bridge-panorama-sunset-260nw-319481531.jpg"
                     alt=""/>
                <div className={s.descriptionBlock}>
                    <img src={profile?.photos?.large || userPhoto} className={s.mainPhoto}/>
                    {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

                    { editMode
                        ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                        : <ProfileData goToEditMode={() => {setEditMode(true)} } profile={profile} isOwner={isOwner}/> }
                    <ProfileStatus status={status} updateStatusTC={updateStatusTC}/>
                </div>
            </div>
        </div>
    )
}