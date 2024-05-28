import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    const {profilePage, addPost,...restProps}=props

    let postsElements = profilePage.posts.map(p=> <div key={p.id}><Post message={p.message} count={p.count}/></div>)

    const onAddPost=(values: AddNewPostFormType)=>{
        addPost(values.newPostText)
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
}

type AddNewPostFormType={
    newPostText: string
}
const maxLength10 = maxLengthCreator(10)

export const AddNewPostForm:React.FC<InjectedFormProps<AddNewPostFormType>> =(props)=> {
    return <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newPostText"} validate={[required,maxLength10]}/>
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