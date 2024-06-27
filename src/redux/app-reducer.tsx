import {AppThunkType} from "./redux-store";
import {authAPI} from "../api/api";
import {setAuthUserDataAC} from "./auth-reducer";
import {handleServerAppError} from "../utils/handleServerAppError";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/handleServerNetworkError";
import {ErrorType, RequestStatusType, ResultCodeEnum} from "../types/types";

let initialState = {
    initialized: false,
    error: null as string | null,
    status: 'idle' as RequestStatusType
}

export type InitialStateAuthType = typeof initialState

export const appReducer = (state: InitialStateAuthType = initialState, action: AppActionsTypes): InitialStateAuthType => {

    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {...state,initialized: true}
        case 'SET-ERROR' :
            return {...state, error: action.error}
        case 'SET-STATUS-LOADING' :
            return {...state, status: action.status}
        default:
            return state
    }
}

// Actions
const initializedSuccessAC = (initialized: boolean) => ({type: 'INITIALIZED_SUCCESS'} as const)
export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)
export const changeStatusLoadingAC = (status: RequestStatusType) => ({type: 'SET-STATUS-LOADING', status} as const)

// Thunks
export const initializeAppTC=(): AppThunkType => (dispatch)=>{
    dispatch(changeStatusLoadingAC('loading'))
    authAPI.authMe()
        .then(res => {
            if (res.resultCode === ResultCodeEnum.Success) {
                const data = res.data
                dispatch(setAuthUserDataAC(data.id, data.email, data.login, true))
                dispatch(changeStatusLoadingAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
        .finally(() => {
            dispatch(initializedSuccessAC(true)) //убрать крутилку в любом случае как только пришел ответ на me запрос
        })
}

// types
export type AppActionsTypes =
    | ReturnType<typeof initializedSuccessAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof changeStatusLoadingAC>
