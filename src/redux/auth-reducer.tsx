import {ActionsTypes} from "./redux-store";

export type SetUserData = ReturnType<typeof setAuthUserDataAC>

export const setAuthUserDataAC = (id: null, email: null, login: null) => ({type: 'SET-USER-DATA', data:{id, email, login}} as const)

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