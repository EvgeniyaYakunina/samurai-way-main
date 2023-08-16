import {ActionsTypes} from "./redux-store";

export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
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


export const followAC = (userId: number) => (
    {type: 'FOLLOW', userId} as const
);
export  const unfollowAC = (userId: number) => (
    {type: 'UNFOLLOW', userId} as const
);
export  const setUsersAC = (users: UserType[]) => (
    {type: 'SET_USERS', users} as const
);

const initialState ={
    users: [] as UserType[]
}

export type InitialStateUsersType = typeof initialState

export const usersReducer = (state: InitialStateUsersType = initialState, action: ActionsTypes): InitialStateUsersType => {

    switch (action.type) {
        case 'FOLLOW':
            return {...state,users: state.users.map(u=> u.id === action.userId ? {...u,followed: true} : u )};

        case 'UNFOLLOW':
            return {...state, users: state.users.map(u=> u.id === action.userId ? {...u,followed: false} : u)};

        case 'SET_USERS':
            return {...state, users: [...state.users, ...action.users]};
        default:
            return state
    }
}

