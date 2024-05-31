import {AppStateType} from "../../redux/redux-store";

export const getProfile=(state: AppStateType)=>{
    return state.profilePage.profile
}
export const getProfileStatus=(state: AppStateType)=>{
    return state.profilePage.status
}
export const getAuthorizedUserId=(state: AppStateType)=>{
    return state.auth.id
}
export const getIsAuth=(state: AppStateType)=>{
    return state.auth.isAuth
}

