import s from "./Users.module.css";
import React, {useEffect} from "react";
import {Pagination} from "../../common/Paginator/Pagination";
import {User} from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, followTC, getUsersThunkCreator, unfollowTC} from "../../redux/users-reducer";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {
    getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersFilter,
    getUsersPage
} from "./usersSelectors";
import {useHistory} from "react-router-dom"
import queryString from 'query-string'
import {Preloader} from "../../common/Preloader/Preloader";


type QueryParamsType = { term?: string; page?: string; friend?: string }

export const Users = () => {
    const isFetching = useAppSelector(getIsFetching)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const pageSize = useAppSelector(getPageSize)
    const currentPage = useAppSelector(getCurrentPage)
    const filter = useAppSelector(getUsersFilter)
    const users = useAppSelector(getUsersPage)
    const followingInProgress = useAppSelector(getFollowingInProgress)

    const history = useHistory()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)


        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }

        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])


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
        {isFetching ? <Preloader/> :
           <div>
               <UsersSearchForm onFilterChanged={onFilterChanged}/>
               <Pagination totalItemsCount={totalUsersCount}
                           pageSize={pageSize}
                           currentPage={currentPage}
                           onPageChanged={onPageChanged}
               />
               {users.map(u =>
                   <User user={u}
                         followingInProgress={followingInProgress}
                         follow={follow}
                         unfollow={unfollow}
                         key={u.id}/>
               )}
           </div>
        }
        </div>
}