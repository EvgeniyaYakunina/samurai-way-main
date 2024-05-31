import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusType = {
    status: string
    updateStatusTC: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusType) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditModeHandler = () => {
        setEditMode(true)
    }
    const deactivateEditModeHandler = () => {
        setEditMode(false)
        props.updateStatusTC(status)
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
