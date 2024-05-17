import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfileTC, ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {usersAPI} from "../../api/api";

type PathParamsType={
    userId: string
}

type MapStateProfileType = {
    profile: ProfileType
    isAuth: boolean
}

type MapStateDispatchProfileType ={
    // setUserProfile: (profile: ProfileType)=> void
    getUserProfileTC: (userId: number)=> void
}

type OwnPropsType = MapStateProfileType & MapStateDispatchProfileType
export type ProfileContainerType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        let userId = +this.props.match.params.userId;

        if (!userId){
            userId = 2;
        }
        this.props.getUserProfileTC(userId)
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        // usersAPI.getProfile(userId)
        //     .then(response => {
        //         this.props.setUserProfile(response.data);
        //     });
    }

    render() {
        if (!this.props.isAuth){
            return <Redirect to={'/login'}/>
        }
        return (
            <div>
                <Profile {...this.props} profile = {this.props.profile} />
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateProfileType =>{
return {
 profile: state.profilePage.profile,
 isAuth: state.auth.isAuth
}
}
let WithUrlDataContainerComponent = withRouter(ProfileContainer);
export default  connect(mapStateToProps, {getUserProfileTC}) (WithUrlDataContainerComponent);
// export default  connect<MapStateProfileType, MapStateDispatchProfileType, {}, AppStateType>(mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);