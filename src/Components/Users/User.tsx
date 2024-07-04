import s from "./Users.module.css"
import userPhoto from "../../assets/images/userIcon.png"
import React from "react"
import {NavLink} from "react-router-dom"
import {UserType} from "../../types/types"

type UsersPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
}

export const User = ({user, followingInProgress, follow, unfollow}: UsersPropsType) => {

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
                               unfollow(user.id)
                           }}> Unfollow </button>

                           : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                               follow(user.id)
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