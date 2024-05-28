import {AppStateType} from "../../../redux/redux-store";
import {MyPosts} from "./MyPosts";
import {addPostAC, InitialStateMyPostsType} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {Dispatch} from "redux";

type MapStateMyPostsType = {
    profilePage: InitialStateMyPostsType
}

type MapStateDispatchMyPostsType={
    addPost: (newPostText: string)=>void
}

export type MyPostsPropsType = MapStateMyPostsType & MapStateDispatchMyPostsType

let mapStateToProps = (state: AppStateType): MapStateMyPostsType => {
    return {
        profilePage: state.profilePage
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapStateDispatchMyPostsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText))
        }
    }
}
export const MyPostsContainer = connect (mapStateToProps,mapDispatchToProps)(MyPosts)