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
export const getLogin=(state: AppStateType)=>{
    return state.auth.login
}
export const getIsAuth=(state: AppStateType)=>{
    return state.auth.isAuth
}