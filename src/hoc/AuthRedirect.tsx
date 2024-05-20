import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

type MapStatePropsType={
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType): MapStatePropsType =>{
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect <T> (Component: ComponentType<T>){
    const RedirectComponent = (props: MapStatePropsType)=> {
        let {isAuth, ...restProps}= props
        if (!isAuth) {
            return <Redirect to={'/login'}/>
        }
        return <Component {...restProps as T}/>
    }

    // let ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    // return ConnectedAuthRedirectComponent
    return connect(mapStateToProps)(RedirectComponent)
}