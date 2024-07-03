import {ResultCodeEnum, UserType} from "../types/types"
import {AppThunkType} from "./redux-store"
import {usersAPI} from "../api/users-api"

export type InitialStateUsersType = typeof initialState
export type FilterType = typeof initialState.filter

const initialState = {
    users: [] as UserType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: 'string',
        friend: null as null | boolean
    }
}

export const usersReducer = (state: InitialStateUsersType = initialState, action: UsersActionsTypes): InitialStateUsersType => {

    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}

        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}

        case 'SET_USERS':
            return {...state, users: action.users}

        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}

        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}

        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}

        case 'TOGGLE_IS_FETCHING_PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        case 'SET_FILTER':
            return {...state, filter: action.payload }
        default:
            return state
    }
}

// actions
export const followSuccess = (userId: number) => ({type: 'FOLLOW', userId} as const)
export const unfollowSuccess = (userId: number) => ({type: 'UNFOLLOW', userId} as const)
export const setUsers = (users: UserType[]) => ({type: 'SET_USERS', users} as const)
export const setCurrentPage = (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => (
    {type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const)
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => (
    {type: 'TOGGLE_IS_FETCHING_PROGRESS', isFetching, userId} as const)
export const setFilter = (filter: FilterType) => (
    {type: 'SET_FILTER', payload: filter} as const)

// thunks
export const getUsersThunkCreator = (page: number, pageSize: number, filter: FilterType): AppThunkType => async (dispatch) => {
    try {
        dispatch(toggleIsFetching(true)) //Запуск крутилки
        dispatch(setCurrentPage(page))
        dispatch(setFilter(filter))
        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    } catch (error) {
    }
}

export const followTC = (userId: number): AppThunkType => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    try {
        let data = await usersAPI.follow(userId)
        console.log(data)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(followSuccess(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    } catch (error) {
        console.log('ошибка при выполнении')
    }
}
export const unfollowTC = (userId: number): AppThunkType => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await usersAPI.unfollow(userId)
    if (data.resultCode === ResultCodeEnum.Success) {
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
    | ReturnType<typeof setFilter>