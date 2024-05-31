import {AppStateType} from "../../redux/redux-store";
import {createSelector} from "reselect";

export const getUsersPage=(state: AppStateType)=>{
    return state.usersPage.users
}
// export const getUsers = createSelector(getUsersPage, (users)=>{
//     return users.filter(u => true)
// }) - более сложный селектор на основе простого
// для сложных действий с данными без лишних перерисовок

export const getPageSize=(state: AppStateType)=>{
    return state.usersPage.pageSize
}
export const getTotalUsersCount=(state: AppStateType)=>{
    return state.usersPage.totalUsersCount
}
export const getCurrentPage=(state: AppStateType)=>{
    return state.usersPage.currentPage
}
export const getIsFetching=(state: AppStateType)=>{
    return state.usersPage.isFetching
}
export const getFollowingInProgress=(state: AppStateType)=>{
    return state.usersPage.followingInProgress
}
