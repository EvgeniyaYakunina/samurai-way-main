import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {getStatusTC, getUserProfileTC} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {getAuthorizedUserId, getIsAuth} from "./profileSelectors";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import { Navigate } from "react-router-dom"
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

const ProfileContainer = () => {
    const authorizedUserId = useAppSelector(getAuthorizedUserId)
    const isAuth = useAppSelector(getIsAuth)
    const dispatch = useAppDispatch()

    const {userId} = useParams<{ userId: string }>()
    const actualUserId = userId || authorizedUserId
    const isOwner = !userId

    useEffect(() => {
        if(actualUserId) {
            dispatch(getUserProfileTC(Number(actualUserId)))
            dispatch(getStatusTC(Number(actualUserId)))
        }
    }, [dispatch, actualUserId])

    if (!isAuth) return <Navigate to="/login"/>
    return (
        <div>
            {/*<Profile isOwner={isOwner}/>*/}
            <ProfileInfo isOwner={isOwner}/>
            <MyPostsContainer/>
        </div>
    )
}

export default withAuthRedirect(ProfileContainer)
