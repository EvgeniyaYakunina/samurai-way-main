import {ActionsTypes, AppThunkDispatch, AppThunkType} from "./redux-store";
import {Dispatch} from "redux";
import {authAPI, usersAPI} from "../api/api";
import {setTotalUsersCount, setUsers, toggleIsFetching} from "./users-reducer";
import {stopSubmit} from "redux-form";
import {getAuthUserDataTC, setAuthUserDataAC} from "./auth-reducer";
import {handleServerAppError} from "../utils/handleServerAppError";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/handleServerNetworkError";

export type initializedSuccess = ReturnType<typeof initializedSuccessAC>
export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type ChangeStatusLoadingActionType = ReturnType<typeof changeStatusLoadingAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

let initialState = {
 initialized: false,
    error: null as string | null,
    status: 'idle' as RequestStatusType
}

export type InitialStateAuthType = typeof initialState

export const appReducer = (state: InitialStateAuthType = initialState, action: ActionsTypes): InitialStateAuthType => {

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
const initializedSuccessAC = (initialized: boolean) => ({type: 'INITIALIZED_SUCCESS'} as const)
export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)
export const changeStatusLoadingAC = (status: RequestStatusType) => ({type: 'SET-STATUS-LOADING', status} as const)

export const initializeAppTC=()=> async (dispatch: AppThunkDispatch)=>{
    // let promise = dispatch(getAuthUserDataTC())
    // await Promise.all([promise])
    //     dispatch(initializedSuccessAC())
    dispatch(changeStatusLoadingAC('loading'))
    authAPI.authMe()
        .then(res => {
            if (res.data.resultCode === 0) {
                const data = res.data.data
                dispatch(setAuthUserDataAC(data.id, data.email, data.login, true))
                dispatch(changeStatusLoadingAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                //  dispatch(setIsLoggedInAC(res.data.data))
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
        .finally(() => {
            dispatch(initializedSuccessAC(true)) //убрать крутилку в любом случае как только пришел ответ на me запрос
        })
}


export type ErrorType = {
    statusCode: number
    messages: [{
        message: string
        field: string
    }],
    error: string
}