import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {followAC, InitialStateUsersType, setUsersAC, unfollowAC, UserType} from "../../redux/usersReducer";


type MapStateUsersType = {
    usersPage: InitialStateUsersType
}

type MapStateDispatchUsersType={
    follow:(userId: number)=> void
    unfollow:(userId: number)=> void
    setUsers:(users: UserType[])=> void
}


export type UsersPropsType = MapStateUsersType & MapStateDispatchUsersType

let mapStateToProps = (state: AppStateType): MapStateUsersType => {
    return {
        usersPage: state.usersPage
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapStateDispatchUsersType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        }
    }
}
export const UsersContainer = connect (mapStateToProps,mapDispatchToProps)(Users)