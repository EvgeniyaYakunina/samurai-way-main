import React, {ChangeEvent} from "react";

type ProfileStatusType={
    status: string
    updateStatusTC: (status: string)=> void
}

class ProfileStatusClass extends React.Component<ProfileStatusType> {

    state= {
        editMode: false,
        status: this.props.status
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
        this.props.updateStatusTC(this.state.status)
    }
    onStatusChange=(e: ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: ProfileStatusType) {

        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                <div>
                    <span onClick={this.activateEditModeHandler}>{this.props.status || "No status"}</span>
                </div>
                    :
                <div>
                    <input onChange={this.onStatusChange} autoFocus onBlur={this.deactivateEditModeHandler} value={this.state.status}/>
                </div>
                }
            </div>
        )
    }
}
export default ProfileStatusClass