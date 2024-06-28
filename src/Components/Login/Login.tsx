import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {createField, GetStringKeys, Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import s from './../../common/FormsControls/FormControls.module.css'

type LoginFormValuesTypeKeys = GetStringKeys<FormDataType>

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type CaptchaType={
    captchaUrl: string | null
}
type LoginFormProps = InjectedFormProps<FormDataType, CaptchaType> & CaptchaType
export const LoginForm = ({handleSubmit, error, captchaUrl}: LoginFormProps) => {
    return <div>
        <form onSubmit={handleSubmit}>
            <div>
                {/*{createField<LoginFormValuesTypeKeys>(Input,"Email","email", "Email", [required], null)}*/}
                {/*{createField<LoginFormValuesTypeKeys>(Input,"password","password", "Password", [required], null)}*/}
                {/*{createField<LoginFormValuesTypeKeys>(Input,"checkbox","rememberMe", null, null, "Remember me")}*/}
                <Field placeholder={"Email"}
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

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {})}

            {error && <div className={s.formSummaryError}>{error}</div>}
            <div>
                <button type={'submit'}>Login</button>
            </div>
        </form>
    </div>
}
const LoginReduxForm = reduxForm<FormDataType, CaptchaType>({
    form: 'login'
})(LoginForm)

type LoginType = {
    isAuth: boolean
    loginTC: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
    captchaUrl: string | null
}

const Login = ({loginTC, isAuth, captchaUrl}: LoginType) => {
    const onSubmit = (formData: FormDataType) => {
       loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}

let mapStateToProps = (state: AppStateType): { isAuth: boolean, captchaUrl: string| null} => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {loginTC})(Login)