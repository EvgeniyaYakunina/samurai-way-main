import React from "react";

type ProfileStatusType={
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType> {
    state= {
        editMode: false
    }
    activateEditModeHandler = () => {

        // this.forceUpdate() -нежелательно использовать
        this.setState({
            editMode: true
        })                 /* изменяет стейт асинхронно */
    }
    deactivateEditModeHandler = () => {

        this.setState({
            editMode: false
        })
    }
    render() {
        return (
            <div>
                {!this.state.editMode ?
                <div>
                    <span onClick={this.activateEditModeHandler}>{this.props.status}</span>
                </div>
                    :
                <div>
                    <input autoFocus onBlur={this.deactivateEditModeHandler} value={this.props.status}/>
                </div>
                }
            </div>
        )
    }
}
export default ProfileStatus