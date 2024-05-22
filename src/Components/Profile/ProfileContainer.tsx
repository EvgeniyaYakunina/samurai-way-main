import React, {ComponentType} from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStatusTC, getUserProfileTC, ProfileType, setUserProfile, updateStatusTC} from "../../redux/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {usersAPI} from "../../api/api";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";

type PathParamsType={
    userId: string
}

type MapStateProfileType = {
    profile: ProfileType
    status: string
}

type MapStateDispatchProfileType ={
    // setUserProfile: (profile: ProfileType)=> void
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
            userId = 29618;
        }
        this.props.getUserProfileTC(userId)
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        // usersAPI.getProfile(userId)
        //     .then(response => {
        //         this.props.setUserProfile(response.data);
        //     });
        this.props.getStatusTC(userId)
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile = {this.props.profile} status={this.props.status} updateStatusTC={this.props.updateStatusTC}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateProfileType =>{
return {
 profile: state.profilePage.profile,
 status: state.profilePage.status
}
}
// let WithUrlDataContainerComponent = withRouter(ProfileContainer);
export default compose<ComponentType>(connect(mapStateToProps, {getUserProfileTC, getStatusTC, updateStatusTC}),
    withRouter,
    // withAuthRedirect
) (ProfileContainer)
// export default withAuthRedirect(connect(mapStateToProps, {getUserProfileTC}) (WithUrlDataContainerComponent))
// export default  connect<MapStateProfileType, MapStateDispatchProfileType, {}, AppStateType>(mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);