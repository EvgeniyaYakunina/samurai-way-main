import {ActionsTypes, AppThunkDispatch, AppThunkType} from "./redux-store";
import {Dispatch} from "redux";
import {authAPI, usersAPI} from "../api/api";
import {setTotalUsersCount, setUsers, toggleIsFetching} from "./users-reducer";

export type SetUserData = ReturnType<typeof setAuthUserDataAC>

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export type InitialStateAuthType = typeof initialState

export const authReducer = (state: InitialStateAuthType = initialState, action: ActionsTypes): InitialStateAuthType => {

    switch (action.type) {
        case 'SET-USER-DATA':
            return {...state, ...action.payload};

        default:
            return state
    }
}
const setAuthUserDataAC = (id: null, email: null, login: null, isAuth: boolean) => (
    {type: 'SET-USER-DATA', payload:{id, email, login, isAuth}} as const)

export const getAuthUserDataTC=()=> {
    return (dispatch: AppThunkDispatch)=>{
        authAPI.authMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    dispatch(setAuthUserDataAC(id, email, login, true))
                }
            });
    }
}
export const loginTC=(email: string, password: string, rememberMe: boolean)=> (dispatch: AppThunkDispatch)=>{
        authAPI.login(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserDataTC())
                }
            });
}
export const logoutTC=()=> {
    return (dispatch: AppThunkDispatch)=>{
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserDataAC(null, null, null, false))
                }
            });
    }
}
// type ActionsType = ReturnType<typeof setAuthUserDataAC> | ReturnType<typeof getAuthUserDataTC >
