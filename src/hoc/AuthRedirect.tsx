import React, {ComponentType} from "react";
import {Navigate} from "react-router-dom";
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
    const RedirectComponent = ({isAuth, ...restProps}: MapStatePropsType)=> {
        if (!isAuth) {
            return <Navigate to={'/login'}/>
        }
        return <Component {...restProps as T}/>
    }

    return connect(mapStateToProps)(RedirectComponent)
}