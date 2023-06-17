import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";

type myPostsType={
    id: number
    message: string
    count: number
}
export const MyPosts: React.FC<myPostsType> = (props) => {

    let posts=[
        {id: 0, message: "Hey, how are you", count: 15},
        {id: 1, message: "It is my first post", count: 20},
    ]

    let postsElements = posts.map(p=> <Post message={p.message} count={p.count}/>)


    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
            </div>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}