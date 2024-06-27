import {AppThunkDispatch, AppThunkType} from "./redux-store";
import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null as string | null // if null, then captcha is not required
}
export type InitialStateAuthType = typeof initialState

export const authReducer = (state: InitialStateAuthType = initialState, action: AuthActionsTypes): InitialStateAuthType => {

    switch (action.type) {
        case 'SET-USER-DATA':
            return {...state, ...action.payload}

        case 'GET_CAPTCHA_URL_SUCCESS':
            return {...state, ...action.payload}
        default:
            return state
    }
}

// Actions
export const setAuthUserDataAC = (id: null, email: null, login: null, isAuth: boolean) => (
    {type: 'SET-USER-DATA', payload: {id, email, login, isAuth}} as const)
const getCaptchaUrlSuccess = (captchaUrl: string) => (
    {type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)

// Thunks
export const getAuthUserDataTC = (): AppThunkType => async (dispatch) => {
    let response = await authAPI.authMe()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string | null): AppThunkType => async (dispatch: AppThunkDispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        // success, get auth data
        dispatch(getAuthUserDataTC())
    } else {
        if(response.data.resultCode === 10){
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const logoutTC = (): AppThunkType => async (dispatch)=> {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}
export const getCaptchaUrl = (): AppThunkType => async (dispatch: AppThunkDispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

//types
export type AuthActionsTypes =
    | ReturnType<typeof setAuthUserDataAC>
    | ReturnType<typeof getCaptchaUrlSuccess>