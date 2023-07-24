import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostType} from "../../../redux/redux-store";

type MyPostsType={
    posts:Array<PostType>
    newPostText: string
    addPost: (postMessage: string)=> void
    updateNewPostText: (newText: string)=> void
}

export const MyPosts: React.FC<MyPostsType> = (props) => {
    const {posts,newPostText, addPost, updateNewPostText,...restProps}=props

    let postsElements = posts.map(p=> <div key={p.id}><Post message={p.message} count={p.count}/></div>)

    const onAddPost =()=>{
            addPost(newPostText);
        // dispatch(addPostAC(newPostText))
    }

    const onPostChange=(e: ChangeEvent<HTMLTextAreaElement>)=>{
        updateNewPostText(e.currentTarget.value);
        // dispatch(updateNewPostTextAC(e.currentTarget.value))
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
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}