import React, {ChangeEvent, useEffect, useState} from "react";
import {updateStatusTC} from "../../../redux/profile-reducer";
import {useAppDispatch} from "../../../redux/redux-store";

export type ProfileStatusType = {
    status: string
}

export const ProfileStatus = (props: ProfileStatusType) => {
const dispatch = useAppDispatch()
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
        dispatch(updateStatusTC(status))
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode ?
                <div>
                   <b>Status: </b> <span onClick={activateEditModeHandler}>{props.status || "No status"}</span>
                </div>
                :
                <div>
                    <input onChange={onStatusChange} value={status} autoFocus onBlur={deactivateEditModeHandler}/>
                </div>
            }
        </div>
    )
}
