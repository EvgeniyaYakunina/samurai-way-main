import React from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import {ProfileStatus} from "./ProfileStatus";


type ProfileInfoType={
    profile: ProfileType
    status: string
    updateStatusTC: (status: string)=> void

}

export const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img src="https://www.shutterstock.com/image-photo/brooklyn-bridge-panorama-sunset-260nw-319481531.jpg"
                     alt=""/>
                <div className={s.descriptionBlock}>
                    <img src={props.profile?.photos?.large}/>
                    <ProfileStatus status={props.status} updateStatusTC={props.updateStatusTC}/>
                </div>
            </div>
        </div>
    )
}