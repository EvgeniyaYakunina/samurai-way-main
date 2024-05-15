import {ActionsTypes} from "./redux-store";
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
            return {...state, ...action.data, isAuth: true};

        default:
            return state
    }
}
const setAuthUserDataAC = (id: null, email: null, login: null) => (
    {type: 'SET-USER-DATA', data:{id, email, login}} as const)

export const getAuthUserDataTC=()=> {
    return (dispatch: Dispatch)=>{
        authAPI.authMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    dispatch(setAuthUserDataAC(id, email, login))
                }
            });
    }
}