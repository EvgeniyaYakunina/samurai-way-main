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


type MapStateUsersType = {
    usersPage: InitialStateUsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

type MapStateDispatchUsersType={
    followTC:(userId: number)=> void
    unfollowTC:(userId: number)=> void
    // setUsers:(users: UserType[])=> void
    setCurrentPage: (pageNumber: number)=> void
    // setTotalUsersCount: (totalCount: number)=> void
    // toggleIsFetching: (isFetching: boolean)=> void
    // toggleFollowingProgress: (isFetching: boolean, userId: number)=> void
    getUsersThunkCreator: (currentPage: number, pageSize: number)=> void

}

export type UsersPropsType = MapStateUsersType & MapStateDispatchUsersType

class UsersContainerComponent extends React.Component<UsersPropsType> {

    // constructor(props: UsersPropsType) {
    //     super(props);
    // }
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
        // this.props.toggleIsFetching(true);
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
        //     .then(data => {
        //         // if (this.props.usersPage.users.length === 0) {
        //         this.props.toggleIsFetching(false);
        //         this.props.setUsers(data.items);
        //         this.props.setTotalUsersCount(data.totalCount);
        //         // }
        //     });
    }
    onPageChanged = (pageNumber: number)=>{
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)
        // this.props.setCurrentPage(pageNumber);
        // this.props.toggleIsFetching(true);
        // usersAPI.getUsers(pageNumber, this.props.pageSize)
        //     .then(data => {
        //         this.props.toggleIsFetching(false);
        //         this.props.setUsers(data.items);
        //     });
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
                      usersPage={this.props.usersPage}
                      // toggleFollowingProgress={this.props.toggleFollowingProgress}
                      followingInProgress={this.props.followingInProgress}
        />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateUsersType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}
// let mapDispatchToProps = (dispatch: Dispatch): MapStateDispatchUsersType => {
//     return {
//         follow: (userId: number) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users: UserType[]) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber: number) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount: number) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }
// export const UsersContainer = connect (mapStateToProps, {
//     followTC,
//     unfollowTC,
//     // setUsers,
//     setCurrentPage,
//     // setTotalUsersCount,
//     // toggleIsFetching,
//     // toggleFollowingProgress,
//     getUsersThunkCreator
// }
// )(UsersContainerComponent)
export default compose<ComponentType>(connect (mapStateToProps, {
    followTC, unfollowTC, setCurrentPage, getUsersThunkCreator}),withRouter, withAuthRedirect)(UsersContainerComponent)