import React, {memo} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import {addPostAC} from "../../../redux/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../redux/redux-store";

export const MyPosts = memo(() => {

    const profilePage = useAppSelector(state => state.profilePage)
    let postsElements = profilePage.posts.map(p => <div key={p.id}><Post message={p.message} count={p.count}/></div>)
    const dispatch = useAppDispatch()

    const onAddPost = (values: AddNewPostFormType) => {
        dispatch(addPostAC(values.newPostText))
        dispatch(reset("profileAddNewPostForm"))
    }

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
            </div>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

type AddNewPostFormType = {
    newPostText: string
}
type PropsType = InjectedFormProps<AddNewPostFormType>
const maxLength10 = maxLengthCreator(10)

export const AddNewPostForm = (props: PropsType) => {
    return <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newPostText"} validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    </div>
}
const AddNewPostFormRedux = reduxForm<AddNewPostFormType>({
    form: "profileAddNewPostForm"
})(AddNewPostForm)