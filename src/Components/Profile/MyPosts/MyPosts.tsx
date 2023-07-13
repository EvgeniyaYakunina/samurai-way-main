import React, {ChangeEvent, MouseEventHandler, RefObject, useRef} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import { ProfileType} from "../Profile";
import {PostType} from "../../../redux/state";

type MyPostsType={
    posts:Array<PostType>
    newPostText: string
    addPost: ()=> void
    updateNewPostText: (newText: string)=> void
}

export const MyPosts: React.FC<MyPostsType> = (props) => {
    const {posts,addPost,newPostText, updateNewPostText,...restProps}=props

    let postsElements = posts.map(p=> <div key={p.id}><Post message={p.message} count={p.count}/></div>)

    const addFirstPost =()=>{
            addPost();
    }

    const onPostChange=(e: ChangeEvent<HTMLTextAreaElement>)=>{
        updateNewPostText(e.currentTarget.value);
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