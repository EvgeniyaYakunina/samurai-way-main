import React from "react";
import {AppStateType} from "../../../redux/redux-store";
import {MyPosts} from "./MyPosts";
import {addPostAC, InitialStateMyPostsType, updateNewPostTextAC} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {Dispatch} from "redux";



type MapStateMyPostsType = {
    profilePage: InitialStateMyPostsType
}

type MapStateDispatchMyPostsType={
    addPost: ()=>void
    updateNewPostText: (newPostText: string)=> void
}

// type MyPostsContainerType={
//     // store: StoreType
// }

// export const MyPostsContainer: React.FC<MyPostsContainerType> = (props) => {
//     const {
//         // store,
//         ...restProps}=props
//
//     // let state = props.store.getState();
//
//     // let newPostElement = React.createRef<HTMLTextAreaElement>();
//
//     // const addPost =()=>{
//     //     store.dispatch(addPostAC())
//     // }
//     //
//     // const onPostChange=(text: string)=>{
//     //     store.dispatch(updateNewPostTextAC(text))
//     // }
//
//
//     return (
//         <StoreContext.Consumer>
//             {(store)=>{
//                 let state = store.getState();
//
//                 const addPost =()=>{
//                     store.dispatch(addPostAC())
//                 }
//
//                 const onPostChange=(text: string)=>{
//                     store.dispatch(updateNewPostTextAC(text))
//                 }
//             return <MyPosts addPost={addPost}
//                      updateNewPostText={onPostChange}
//                      posts={state.profilePage.posts}
//                      newPostText={state.profilePage.newPostText}/>
//             }}
//         </StoreContext.Consumer>
//     )
// }
export type MyPostsPropsType = MapStateMyPostsType & MapStateDispatchMyPostsType

let mapStateToProps = (state: AppStateType): MapStateMyPostsType => {
    return {
        profilePage: state.profilePage
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapStateDispatchMyPostsType => {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        // onPostChange: (text: string) => {
        //     dispatch(updateNewPostTextAC(text))
        // }
        updateNewPostText: (newPostText: string) => {
            dispatch(updateNewPostTextAC(newPostText))
        }
    }
}
export const MyPostsContainer = connect (mapStateToProps,mapDispatchToProps)(MyPosts)