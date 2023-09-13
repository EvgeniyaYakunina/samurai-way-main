import {ActionsTypes} from "./redux-store";

export type UserType = {
    id: number
    photos: {
        small: string
        large: string
    }
    followed: boolean
    name: string
    status: string
    location: LocationType
}
type LocationType={
    city: string
    country: string
}

export type follow= ReturnType<typeof followAC>
export type unfollow = ReturnType<typeof unfollowAC>
export type setUsers = ReturnType<typeof setUsersAC>
export type setCurrentPage = ReturnType<typeof setCurrentPageAC>
export type setTotalUsersCount = ReturnType<typeof setTotalUsersCountAC>
export type toggleIsFetching = ReturnType<typeof toggleIsFetchingAC>

export type InitialStateUsersType = typeof initialState

const initialState ={
    users: [] as UserType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

export const usersReducer = (state: InitialStateUsersType = initialState, action: ActionsTypes): InitialStateUsersType => {

    switch (action.type) {
        case 'FOLLOW':
            return {...state,users: state.users.map(u=> u.id === action.userId ? {...u,followed: true} : u )};

        case 'UNFOLLOW':
            return {...state, users: state.users.map(u=> u.id === action.userId ? {...u,followed: false} : u)};

        case 'SET_USERS':
            return {...state, users: action.users};

        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage};

        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount};

        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching};

        default:
            return state
    }
}

export const followAC = (userId: number) => (
    {type: 'FOLLOW', userId} as const
);
export  const unfollowAC = (userId: number) => (
    {type: 'UNFOLLOW', userId} as const
);
export  const setUsersAC = (users: UserType[]) => (
    {type: 'SET_USERS', users} as const
);
export const setCurrentPageAC = (currentPage: number) =>(
    {type: 'SET_CURRENT_PAGE', currentPage} as const
)
export const setTotalUsersCountAC = (totalUsersCount: number) =>(
    {type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const
)
export const toggleIsFetchingAC = (isFetching: boolean) =>(
    {type: 'TOGGLE_IS_FETCHING', isFetching} as const
)