import React from "react";
import {Contact} from "./Contact";
import {ContactsType, ProfileType} from "../../../types/types";

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
export const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
        }

        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>:
            {profile?.contacts && Object.keys(profile?.contacts).map(key => {
                const contacts = profile?.contacts! as ContactsType
                return (
                    <Contact
                        key={key}
                        contactTitle={key}
                        contactValue={contacts[key as keyof ContactsType]}
                    />
                );
            })}
        </div>
    </div>
}