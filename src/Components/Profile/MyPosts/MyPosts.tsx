import React, {ChangeEvent, MouseEventHandler, RefObject, useRef} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import { ProfileType} from "../Profile";
import {ActionsTypes, addPostAC, PostType, updateNewPostTextAC} from "../../../redux/state";
import {message} from "antd";

type MyPostsType={
    posts:Array<PostType>
    newPostText: string
    dispatch: (action: ActionsTypes)=> void
    // addPost: (postMessage: string)=> void
    // updateNewPostText: (newText: string)=> void
}

export const MyPosts: React.FC<MyPostsType> = (props) => {
    const {posts,newPostText, dispatch,...restProps}=props

    let postsElements = posts.map(p=> <div key={p.id}><Post message={p.message} count={p.count}/></div>)

    const addFirstPost =()=>{
            // addPost(newPostText);
        dispatch(addPostAC(newPostText))
    }

    const onPostChange=(e: ChangeEvent<HTMLTextAreaElement>)=>{
        // updateNewPostText(e.currentTarget.value);
        dispatch(updateNewPostTextAC(e.currentTarget.value))
    }


    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
            </div>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={newPostText}/>
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