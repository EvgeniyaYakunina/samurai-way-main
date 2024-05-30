import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import s from './../../common/FormsControls/FormControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return <div>
        <form onSubmit={handleSubmit}>
            <div><Field placeholder={"Email"}
                        name={"email"}
                        component={Input}
                        validate={[required]}
            /></div>
            <div><Field placeholder={"Password"}
                        name={"password"}
                        type={"password"}
                        component={Input}
                        validate={[required]}
            /></div>
            <div><Field component={Input} name={"rememberMe"} type={"checkbox"}/>Remember me</div>
            {error && <div className={s.formSummaryError}>{error}</div>}
            <div>
                <button type={'submit'}>Login</button>
            </div>
        </form>
    </div>
}
const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)

type LoginType = {
    isAuth: boolean
    loginTC: (email: string, password: string, rememberMe: boolean) => void
}

const Login = (props: LoginType) => {
    const onSubmit = (formData: FormDataType) => {
       props.loginTC(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

let mapStateToProps = (state: AppStateType): { isAuth: boolean } => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {loginTC})(Login)