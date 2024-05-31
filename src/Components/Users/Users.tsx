import s from "./Users.module.css";
import userPhoto from "../../assets/images/userIcon.png";
import React from "react";
import {InitialStateUsersType, UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followTC: (userId: number) => void
    unfollowTC: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    // usersPage: InitialStateUsersType
    usersPage: UserType[]
    // toggleFollowingProgress: (isFetching: boolean, userId: number)=> void
    followingInProgress: Array<number>
}

export const Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount/props.pageSize);
    let pages = [];
    for(let i=1; i <= pagesCount; i++){
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span key={p} className={props.currentPage === p ? s.selectedPage : ''}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })
            }
        </div>
        {
            // props.usersPage.users.map(u => <div key={u.id}>
                props.usersPage.map(u=><div key={u.id}>
               <span>
                   <div>
                       <NavLink to={'/profile/' + u.id} >
                       <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}/>
                       </NavLink>
                   </div>
                   <div>
                       {u.followed ?
                           <button  disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                               props.unfollowTC(u.id)
                           }}> Unfollow </button>

                           : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                               props.followTC(u.id)
                           }}> Follow </button>}
                   </div>
               </span>
                    <span>
                   <span>
                       <div>{u.name}</div><div>{u.status}</div>
                   </span>
                   <span>
                       <div>{'u.location.country'}</div><div>{'u.location.city'}</div>
                   </span>
               </span>
                </div>
            )
        }
    </div>
}