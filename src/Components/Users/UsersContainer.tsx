import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    followTC,
    getUsersThunkCreator,
    InitialStateUsersType,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFollowingProgress, toggleIsFetching, unfollowTC,
    UserType
} from "../../redux/users-reducer";
import {Users} from "./Users";
import {Preloader} from "../../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {withRouter} from "react-router-dom";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersPage
} from "./usersSelectors";


type MapStateUsersType = {
    // users: InitialStateUsersType
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

type MapStateDispatchUsersType={
    followTC:(userId: number)=> void
    unfollowTC:(userId: number)=> void
    setCurrentPage: (pageNumber: number)=> void
    getUsersThunkCreator: (currentPage: number, pageSize: number)=> void

}

export type UsersPropsType = MapStateUsersType & MapStateDispatchUsersType

class UsersContainerComponent extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (pageNumber: number)=>{
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
        <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                       followTC={this.props.followTC}
                      unfollowTC={this.props.unfollowTC}
                      onPageChanged={this.onPageChanged}
                      usersPage={this.props.users}
                      // toggleFollowingProgress={this.props.toggleFollowingProgress}
                      followingInProgress={this.props.followingInProgress}
        />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStateUsersType => {
    return {
        users: getUsersPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}
export default compose<ComponentType>(connect (mapStateToProps, {
    followTC, unfollowTC, setCurrentPage, getUsersThunkCreator}),withRouter, withAuthRedirect)(UsersContainerComponent)