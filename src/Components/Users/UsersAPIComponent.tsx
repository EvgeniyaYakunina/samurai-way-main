import React from "react";
import axios from "axios";
import {UsersPropsType} from "./UsersContainer";
import {Users} from "./Users";



// class UsersC extends React.Component {
//
//     constructor(props: UsersPropsType) {
//         super(props);
//         alert('New')
//         axios.get('https://social-network.samuraijs.com/api/1.0/users')
//             .then(response=>{
//                 this.props.setUsers(response.data.items)
//             })
//     }
//     // getUsers=()=> {
//     //     if (this.props.usersPage.users.length === 0)
//     //         }
//
//     render() {
//         return <div>
//             {/*<button onClick={this.getUsers}>Get Users</button>*/}
//             {
//                 this.props.usersPage.users.map(u => <div key={u.id}>
//                <span>
//                    <div><img src= {u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}/></div>
//                    <div>
//                        {u.followed ?
//                            <button onClick={() => {this.props.unfollow(u.id)}}> Unfollow </button>
//                            : <button onClick={()=>{this.props.follow(u.id)}}> Follow </button>}
//                        </div>
//                </span>
//                         <span>
//                    <span>
//                        <div>{u.name}</div><div>{u.status}</div>
//                    </span>
//                    <span>
//                        <div>{'u.location.country'}</div><div>{'u.location.city'}</div>
//                    </span>
//                </span>
//                     </div>
//                 )
//             }
//         </div>
//     }
// }