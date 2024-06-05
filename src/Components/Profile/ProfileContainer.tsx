import React, {ComponentType} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStatusTC, getUserProfileTC, ProfileType, updateStatusTC} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {getAuthorizedUserId, getIsAuth, getProfile, getProfileStatus} from "./profileSelectors";

type PathParamsType={
    userId: string
}

type MapStateProfileType = {
    profile: ProfileType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type MapStateDispatchProfileType ={
    getUserProfileTC: (userId: number)=> void
    getStatusTC: (userId: number)=> void
    updateStatusTC: (status: string)=> void
}

type OwnPropsType = MapStateProfileType & MapStateDispatchProfileType
export type ProfileContainerType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        let userId = +this.props.match.params.userId;

        if (!userId){
            if(this.props.authorizedUserId !== null){
                userId = this.props.authorizedUserId
                if(!userId){
                    this.props.history.push("/login")
                }
            }
        }
        this.props.getUserProfileTC(userId)
        this.props.getStatusTC(userId)
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile = {this.props.profile}
                         status={this.props.status}
                         updateStatusTC={this.props.updateStatusTC}
                />
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateProfileType => {
    return {
        profile: getProfile(state),
        status: getProfileStatus(state),
        authorizedUserId: getAuthorizedUserId(state),
        isAuth: getIsAuth(state)
    }
}

export default compose<ComponentType>(connect(mapStateToProps, {
    getUserProfileTC,
        getStatusTC,
        updateStatusTC
}),
    withRouter,
    // withAuthRedirect
) (ProfileContainer)
