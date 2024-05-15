import React from "react";
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {getAuthUserDataTC, InitialStateAuthType} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {authAPI} from "../../api/api";

type MapStateHeadersType = {
    data: InitialStateAuthType
    id: null,
    email: null,
    login: null,
    isAuth: boolean
}

type MapStateDispatchHeadersType={
    // setAuthUserDataAC:(id: null, email: null, login: null)=> void
    getAuthUserDataTC: ()=> void
}
export type HeadersPropsType = MapStateHeadersType & MapStateDispatchHeadersType

class HeaderContainer extends React.Component<HeadersPropsType>{
    // constructor(props: HeadersPropsType) {
    //     super(props);
    // }
    componentDidMount() {
        this.props.getAuthUserDataTC()
        // axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials: true})
        // authAPI.getAuth()
        //     .then(response => {
        //
        //         if (response.data.resultCode === 0) {
        //             let {id, email, login} = response.data.data;
        //             this.props.setAuthUserDataAC(id, email, login);
        //         }
        //     });
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStateHeadersType => {
    return {
        data: state.auth,
        id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
};

export default connect (mapStateToProps, {getAuthUserDataTC}) (HeaderContainer);
