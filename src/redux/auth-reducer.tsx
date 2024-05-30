import {ActionsTypes, AppThunkDispatch} from "./redux-store";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

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
    {type: 'SET-USER-DATA', payload: {id, email, login, isAuth}} as const)

export const getAuthUserDataTC = () => (dispatch: AppThunkDispatch) => {
    return authAPI.authMe()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setAuthUserDataAC(id, email, login, true))
            }
        });
}
export const loginTC=(email: string, password: string, rememberMe: boolean)=> {

    console.log({email, password, rememberMe})
    return (dispatch: AppThunkDispatch)=> {

        authAPI.login(email, password, rememberMe)

            .then(response => {

                if (response.data.resultCode === 0) {

                    dispatch(getAuthUserDataTC())
                } else {

                    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                    dispatch(stopSubmit("login", {_error: message}))
                }
            });
    }
}

export const logoutTC = () => {

    return (dispatch: AppThunkDispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserDataAC(null, null, null, false))
                }
            });
    }
}

