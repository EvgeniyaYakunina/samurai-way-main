import {AppStateType} from "../../../redux/redux-store";
import {MyPosts} from "./MyPosts";
import {addPostAC, InitialStateMyPostsType} from "../../../redux/profile-reducer";
import {connect} from "react-redux";

type MapStateMyPostsType = {
    profilePage: InitialStateMyPostsType
}

let mapStateToProps = (state: AppStateType): MapStateMyPostsType => {
    return {
        profilePage: state.profilePage
    }
}

export const MyPostsContainer = connect (mapStateToProps,{addPost: addPostAC})(MyPosts)