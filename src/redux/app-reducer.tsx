import {ActionsTypes, AppThunkDispatch, AppThunkType} from "./redux-store";
import {Dispatch} from "redux";
import {authAPI, usersAPI} from "../api/api";
import {setTotalUsersCount, setUsers, toggleIsFetching} from "./users-reducer";
import {stopSubmit} from "redux-form";
import {getAuthUserDataTC} from "./auth-reducer";

export type initializedSuccess = ReturnType<typeof initializedSuccessAC>

let initialState = {
 initialized: false
}

export type InitialStateAuthType = typeof initialState

export const appReducer = (state: InitialStateAuthType = initialState, action: ActionsTypes): InitialStateAuthType => {

    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {...state,initialized: true};

        default:
            return state
    }
}
const initializedSuccessAC = () => ({type: 'INITIALIZED_SUCCESS'} as const)

export const initializeAppTC=()=> (dispatch: AppThunkDispatch)=>{
    let promise = dispatch(getAuthUserDataTC())
    Promise.all([promise])
        .then(()=>{
        dispatch(initializedSuccessAC())
    })
}


