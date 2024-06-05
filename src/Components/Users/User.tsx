import s from "./Users.module.css";
import userPhoto from "../../assets/images/userIcon.png";
import React from "react";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

type UsersPropsType = {
    user: UserType
    followTC: (userId: number) => void
    unfollowTC: (userId: number) => void
    followingInProgress: Array<number>
}

export const User = ({user, unfollowTC, followTC, followingInProgress}: UsersPropsType) => {

    return <div>
        <div key={user.id}>
               <span>
                   <div>
                       <NavLink to={'/profile/' + user.id}>
                       <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.userPhoto}/>
                       </NavLink>
                   </div>
                   <div>
                       {user.followed ?
                           <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                               unfollowTC(user.id)
                           }}> Unfollow </button>

                           : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                               followTC(user.id)
                           }}> Follow </button>}
                   </div>
               </span>
                    <span>
                   <span>
                       <div>{user.name}</div><div>{user.status}</div>
                   </span>
                   <span>
                       <div>{'u.location.country'}</div><div>{'u.location.city'}</div>
                   </span>
               </span>
                </div>
    </div>
}