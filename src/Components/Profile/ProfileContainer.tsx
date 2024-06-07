import React, {ComponentType} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStatusTC, getUserProfileTC, ProfileType, savePhoto, updateStatusTC} from "../../redux/profile-reducer";
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
    savePhoto: (file: File) => void
}

type OwnPropsType = MapStateProfileType & MapStateDispatchProfileType
export type ProfileContainerType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<ProfileContainerType> {
    refreshProfile() {
        let userId = +this.props.match.params.userId;

        if (!userId){
            if(this.props.authorizedUserId !== null){
                userId = this.props.authorizedUserId
                if(!userId){
                    this.props.history.push("/login")
                }}}
        this.props.getUserProfileTC(userId)
        this.props.getStatusTC(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: Readonly<ProfileContainerType>) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         profile = {this.props.profile}
                         status={this.props.status}
                         updateStatusTC={this.props.updateStatusTC}
                         savePhoto={this.props.savePhoto}
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
        updateStatusTC,
        savePhoto
}),
    withRouter,
    // withAuthRedirect
) (ProfileContainer)
