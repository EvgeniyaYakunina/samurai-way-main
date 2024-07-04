import s from "./Users.module.css";
import React, {useEffect} from "react";
import {Pagination} from "../../common/Paginator/Pagination";
import {User} from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, followTC, getUsersThunkCreator, unfollowTC} from "../../redux/users-reducer";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount,
    getUsersFilter, getUsersPage} from "./usersSelectors";

export const Users = () => {
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const pageSize = useAppSelector(getPageSize)
    const currentPage = useAppSelector(getCurrentPage)
    const filter = useAppSelector(getUsersFilter)
    const users = useAppSelector(getUsersPage)
    const followingInProgress = useAppSelector(getFollowingInProgress)

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
    },[])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(followTC(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowTC(userId))
    }
    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Pagination totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
        />
        {
            users.map(u =>
                <User user={u}
                      followingInProgress={followingInProgress}
                      follow={follow}
                      unfollow={unfollow}
                      key={u.id}/>
            )
        }
    </div>
}