import {AppStateType} from "../../redux/redux-store";

export const getDataAuth=(state: AppStateType)=>{
    return state.auth
}
export const getAuthId=(state: AppStateType)=>{
    return state.auth.id
}
export const getEmail=(state: AppStateType)=>{
    return state.auth.email
}
export const selectCurrentUserLogin=(state: AppStateType)=>{
    return state.auth.login
}
export const selectIsAuth=(state: AppStateType)=>{
    return state.auth.isAuth
}