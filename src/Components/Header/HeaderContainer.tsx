import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {getAuthUserDataTC, InitialStateAuthType, logoutTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {getAuthId, getDataAuth, getEmail, getIsAuth, getLogin} from "./headerSelectors";

type MapStateHeadersType = {
    data: InitialStateAuthType
    id: null,
    email: null,
    login: null,
    isAuth: boolean
}

type MapStateDispatchHeadersType= {
    // getAuthUserDataTC: () => void
    logoutTC: () => void
}

class HeaderContainer extends React.Component<MapStateHeadersType & MapStateDispatchHeadersType>{

    componentDidMount() {
        // this.props.getAuthUserDataTC()
    }

    render() {
        return <Header {...this.props} logout={this.props.logoutTC}
                       // getAuthUserDataTC={this.props.getAuthUserDataTC}
                        login={this.props.login} isAuth={ this.props.isAuth}
        />
    }
}

const mapStateToProps = (state: AppStateType): MapStateHeadersType => {
    return {
        data: getDataAuth(state),
        id: getAuthId(state),
        email: getEmail(state),
        login: getLogin(state),
        isAuth: getIsAuth(state)
    }
};

export default connect (mapStateToProps, {
    // getAuthUserDataTC,
    logoutTC
}) (HeaderContainer);
