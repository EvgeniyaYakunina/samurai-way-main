import s from "./Users.module.css";
import React from "react";
import {Pagination} from "../../common/Paginator/Pagination";
import {User} from "./User";
import {UserType} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followTC: (userId: number) => void
    unfollowTC: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    usersPage: UserType[]
    followingInProgress: Array<number>
}

export const Users = ({
                          usersPage,
                          pageSize,
                          currentPage,
                          followingInProgress,
                          followTC,
                          onPageChanged,
                          totalUsersCount,
                          unfollowTC,
                          onFilterChanged
                      }: UsersPropsType) => {

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Pagination totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
        />
        {
            usersPage.map(u =>
                <User user={u}
                      followingInProgress={followingInProgress}
                      followTC={followTC}
                      unfollowTC={unfollowTC}
                      key={u.id}/>
            )
        }
    </div>
}