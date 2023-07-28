import React from "react";
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {StoreType} from "../../redux/redux-store";


export type PostsType={
    // store: StoreType
}

export const Profile: React.FC<PostsType> = (props) => {
    const {
        // store,
        ...restProps}=props

    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer
                // store={store}
            />
        </div>
    )
}