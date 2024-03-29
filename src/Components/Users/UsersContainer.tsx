import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {
    follow,
    InitialStateUsersType,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleIsFetching,
    unfollow,
    UserType
} from "../../redux/usersReducer";
import axios from "axios";
import {Users} from "./Users";
import {Preloader} from "../../common/Preloader/Preloader";


type MapStateUsersType = {
    usersPage: InitialStateUsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

type MapStateDispatchUsersType={
    follow:(userId: number)=> void
    unfollow:(userId: number)=> void
    setUsers:(users: UserType[])=> void
    setCurrentPage: (pageNumber: number)=> void
    setTotalUsersCount: (totalCount: number)=> void
    toggleIsFetching: (isFetching: boolean)=> void
}

export type UsersPropsType = MapStateUsersType & MapStateDispatchUsersType

class UsersContainerComponent extends React.Component<UsersPropsType> {

    constructor(props: UsersPropsType) {
        super(props);
    }
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                // if (this.props.usersPage.users.length === 0) {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
                // }
            });
    }
    onPageChanged = (pageNumber: number)=>{
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
            });
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
        <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      onPageChanged={this.onPageChanged}
                      usersPage={this.props.usersPage}
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
        isFetching: state.usersPage.isFetching
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
export const UsersContainer = connect (mapStateToProps,
{follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching}
)(UsersContainerComponent)