import { UsersPropsType} from "./UsersContainer";
import s from './Users.module.css'

export const Users = (props: UsersPropsType)=>{
    // const {usersPage, follow, unfollow, setUsers, ...restProps} = props

    if (props.usersPage.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'https://kartinkin.net/uploads/posts/2022-03/1646753068_1-kartinkin-net-p-kartinki-devushka-narisovannaya-1.jpg',
                followed: true,
                fullName: 'Delia',
                status: 'Who am I',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 2,
                photoUrl: 'https://kartinkin.net/uploads/posts/2022-03/thumbs/1646753070_2-kartinkin-net-p-kartinki-devushka-narisovannaya-2.jpg',
                followed: false,
                fullName: 'Sasha',
                status: 'I am a',
                location: {city: 'Moscow', country: 'Russia'}
            },
            {
                id: 3,
                photoUrl: 'https://kartinkin.net/uploads/posts/2022-03/thumbs/1646753027_11-kartinkin-net-p-kartinki-devushka-narisovannaya-11.jpg',
                followed: false,
                fullName: 'Andry',
                status: 'I am',
                location: {city: 'Kazan', country: 'Tatarstan'}
            },
        ])
    }
    return <div>
        {
           props.usersPage.users.map(u => <div key={u.id}>
               <span>
                   <div><img src= {u.photoUrl} className={s.userPhoto}/></div>
                   <div>
                       {u.followed ?
                       <button onClick={() => {props.unfollow(u.id)}}> Unfollow </button>
                           : <button onClick={()=>{props.follow(u.id)}}> Follow </button>}
                       </div>
               </span>
               <span>
                   <span>
                       <div>{u.fullName}</div><div>{u.status}</div>
                   </span>
                   <span>
                       <div>{u.location.country}</div><div>{u.location.city}</div>
                   </span>
               </span>
                </div>
            )
        }
    </div>
}