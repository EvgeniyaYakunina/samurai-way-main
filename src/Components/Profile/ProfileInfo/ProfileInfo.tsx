import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../../common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";
import userPhoto from '../../../assets/images/userIcon.png'
import {ProfileDataFormReduxForm} from "./ProfileDataForm";
import {ProfileData} from "./ProfileData";
import {ProfileType} from "../../../types/types";
import {useAppDispatch, useAppSelector} from "../../../redux/redux-store";
import {getProfile, getProfileStatus} from "../profileSelectors";
import {savePhoto, saveProfile} from "../../../redux/profile-reducer";

type ProfileInfoType={
    isOwner: boolean
}

export const ProfileInfo = ({isOwner}: ProfileInfoType) => {
    const profile = useAppSelector(getProfile)
    const status = useAppSelector(getProfileStatus)
    const dispatch = useAppDispatch()

    let [editMode, setEditMode] = useState(false)

    if (!profile){return <Preloader/>}

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }
    const onSubmit = (formData: ProfileType) => {
        dispatch(saveProfile(formData))
            // .then(() => {setEditMode(false)})
           setEditMode(false)
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
                    <ProfileStatus status={status}
                                   // updateStatusTC={updateStatusTC}
                    />
                </div>
            </div>
        </div>
    )
}
