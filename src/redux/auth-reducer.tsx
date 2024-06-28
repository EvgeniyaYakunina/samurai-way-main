import {AppThunkDispatch, AppThunkType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {ResultCodeEnum} from "../types/types";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

let initialState = {
    id: null as (number | null),
    email: null as string | null,
    login: null as string | null,
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
export const setAuthUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => (
    {type: 'SET-USER-DATA', payload: {id, email, login, isAuth}} as const)
const getCaptchaUrlSuccess = (captchaUrl: string) => (
    {type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)

// Thunks
export const getAuthUserDataTC = (): AppThunkType => async (dispatch) => {
    let meData = await authAPI.authMe()
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string | null): AppThunkType => async (dispatch: AppThunkDispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodeEnum.Success) {
        // success, get auth data
        dispatch(getAuthUserDataTC())
    } else {
        if(loginData.resultCode === ResultCodeEnum.CaptchaIsRequired){
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const logoutTC = (): AppThunkType => async (dispatch)=> {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}
export const getCaptchaUrl = (): AppThunkType => async (dispatch: AppThunkDispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

//types
export type AuthActionsTypes =
    | ReturnType<typeof setAuthUserDataAC>
    | ReturnType<typeof getCaptchaUrlSuccess>