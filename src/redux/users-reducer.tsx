import {usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {UserType} from "../types/types";
import {AppThunkType} from "./redux-store";

export type InitialStateUsersType = typeof initialState

const initialState = {
    users: [] as UserType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

export const usersReducer = (state: InitialStateUsersType = initialState, action: UsersActionsTypes): InitialStateUsersType => {

    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)};

        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)};

        case 'SET_USERS':
            return {...state, users: action.users};

        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage};

        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount};

        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching};

        case 'TOGGLE_IS_FETCHING_PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            };

        default:
            return state
    }
}

// actions
export const followSuccess = (userId: number) => (
    {type: 'FOLLOW', userId} as const
);
export const unfollowSuccess = (userId: number) => (
    {type: 'UNFOLLOW', userId} as const
);
export const setUsers = (users: UserType[]) => (
    {type: 'SET_USERS', users} as const
);
export const setCurrentPage = (currentPage: number) => (
    {type: 'SET_CURRENT_PAGE', currentPage} as const
)
export const setTotalUsersCount = (totalUsersCount: number) => (
    {type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const
)
export const toggleIsFetching = (isFetching: boolean) => (
    {type: 'TOGGLE_IS_FETCHING', isFetching} as const
)
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => (
    {type: 'TOGGLE_IS_FETCHING_PROGRESS', isFetching, userId} as const
)
// thunks
export const getUsersThunkCreator = (page: number, pageSize: number): AppThunkType => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}
export const followTC = (userId: number): AppThunkType => async (dispatch: Dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await usersAPI.follow(userId)
    if (response.data.resultCode === 0) {
        dispatch(followSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}
export const unfollowTC = (userId: number): AppThunkType => async (dispatch: Dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await usersAPI.unfollow(userId)
    if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

//types
export type UsersActionsTypes =
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>