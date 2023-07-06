import React, {MouseEventHandler, RefObject, useRef} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import { ProfileType} from "../Profile";

type MyPostsType={
    posts:Array<ProfileType>
    addPost: (postMessage: string)=> void
}

export const MyPosts: React.FC<MyPostsType> = (props) => {
    const {posts,addPost,...restProps}=props
    // let posts=[
    //     {id: 0, message: "Hey, how are you", count: 15},
    //     {id: 1, message: "It is my first post", count: 20},
    // ]

    let postsElements = props.posts.map(p=> <Post message={p.message} count={p.count}/>)

    let newPostElement = useRef<HTMLTextAreaElement>(null);
    // let newPostElement = React.createRef<HTMLTextAreaElement>();

    const addFirstPost =()=>{
        if(newPostElement.current !== null){
            addPost(newPostElement.current.value)
        }
    }


    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
            </div>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
                </div>
                <div>
                    <button onClick={addFirstPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}