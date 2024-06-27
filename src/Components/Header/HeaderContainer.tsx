import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {logoutTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {getAuthId, getDataAuth, getEmail, getIsAuth, getLogin} from "./headerSelectors";

type MapStateHeadersType = ReturnType<typeof mapStateToProps>

type MapStateDispatchHeadersType= {
    logoutTC: () => void
}

class HeaderContainer extends React.Component<MapStateHeadersType & MapStateDispatchHeadersType>{

    componentDidMount() {
    }

    render() {
        return <Header {...this.props} logout={this.props.logoutTC}
                        login={this.props.login} isAuth={ this.props.isAuth}
        />
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        data: getDataAuth(state),
        id: getAuthId(state),
        email: getEmail(state),
        login: getLogin(state),
        isAuth: getIsAuth(state)
    }
};

export default connect (mapStateToProps, {
    logoutTC
}) (HeaderContainer);
