import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType={
    userId: string
}

type MapStateProfileType = {
    profile: ProfileType
}

type MapStateDispatchProfileType ={
    setUserProfile: (profile: ProfileType)=> void
}

type OwnPropsType = MapStateProfileType & MapStateDispatchProfileType
export type ProfileContainerType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        let userId = +this.props.match.params.userId;

        if (!userId){
            userId = 2;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile = {this.props.profile} />
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateProfileType =>{
return {
 profile: state.profilePage.profile
}
}
let WithUrlDataContainerComponent = withRouter(ProfileContainer);
export default  connect(mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);
// export default  connect<MapStateProfileType, MapStateDispatchProfileType, {}, AppStateType>(mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);