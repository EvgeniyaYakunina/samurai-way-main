import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}
export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <div>
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder={"Login"} name={"login"} component={"input"}/></div>
            <div><Field placeholder={"Password"} name={"password"} component={"input"}/></div>
            <div><Field component={"input"} name={"rememberMe"} type={"checkbox"}/>Remember me</div>
            <div>
                <button>Login</button>
            </div>
        </form>
    </div>
}
const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)

export const Login = () => {
    const onSubmit = (formData: FormDataType )=>{
        console.log(formData)
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}