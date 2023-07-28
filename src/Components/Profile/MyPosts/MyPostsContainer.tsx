import React from "react";
import {StoreType} from "../../../redux/redux-store";
import {MyPosts} from "./MyPosts";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";
import {StoreContext} from "../../../StoreContext";

type MyPostsContainerType={
    // store: StoreType
}

export const MyPostsContainer: React.FC<MyPostsContainerType> = (props) => {
    const {
        // store,
        ...restProps}=props

    // let state = props.store.getState();

    // let newPostElement = React.createRef<HTMLTextAreaElement>();

    // const addPost =()=>{
    //     store.dispatch(addPostAC())
    // }
    //
    // const onPostChange=(text: string)=>{
    //     store.dispatch(updateNewPostTextAC(text))
    // }


    return (
        <StoreContext.Consumer>
            {(store)=>{
                let state = store.getState();

                const addPost =()=>{
                    store.dispatch(addPostAC())
                }

                const onPostChange=(text: string)=>{
                    store.dispatch(updateNewPostTextAC(text))
                }
            return <MyPosts addPost={addPost}
                     updateNewPostText={onPostChange}
                     posts={state.profilePage.posts}
                     newPostText={state.profilePage.newPostText}/>
            }}
        </StoreContext.Consumer>
    )
}