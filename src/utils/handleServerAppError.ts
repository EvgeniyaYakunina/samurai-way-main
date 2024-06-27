import {changeStatusLoadingAC, setErrorAC} from "../redux/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from '../types/types'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    const error = data.messages[0]
    if (error) {
        dispatch(setErrorAC(error))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(changeStatusLoadingAC('failed'))
}