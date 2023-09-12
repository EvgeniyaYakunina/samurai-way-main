import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {
    followAC,
    InitialStateUsersType,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    UserType
} from "../../redux/usersReducer";
import Users from "./Users";


type MapStateUsersType = {
    usersPage: InitialStateUsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

type MapStateDispatchUsersType={
    follow:(userId: number)=> void
    unfollow:(userId: number)=> void
    setUsers:(users: UserType[])=> void
    setCurrentPage: (pageNumber: number)=> void
    setTotalUsersCount: (totalCount: number)=> void
}


export type UsersPropsType = MapStateUsersType & MapStateDispatchUsersType

let mapStateToProps = (state: AppStateType): MapStateUsersType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
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
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setTotalUsersCountAC(totalCount))
        }
    }
}
export const UsersContainer = connect (mapStateToProps,mapDispatchToProps)(Users)