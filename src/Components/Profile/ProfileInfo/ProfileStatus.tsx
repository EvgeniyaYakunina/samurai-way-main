import React, {ChangeEvent, ChangeEventHandler, useState} from "react";

type ProfileStatusType = {
    status: string
    updateStatusTC: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusType) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState('')

    const activateEditModeHandler = () => {
        setEditMode(true)
    }
    const deactivateEditModeHandler = () => {
        setEditMode(false)

    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode ?
                <div>
                    <span onClick={activateEditModeHandler}>{props.status || "No status"}</span>
                </div>
                :
                <div>
                    <input onChange={onStatusChange} value={status} autoFocus onBlur={deactivateEditModeHandler}/>
                </div>
            }
        </div>
    )
}
