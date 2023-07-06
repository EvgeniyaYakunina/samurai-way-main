import React from 'react';
import s from './Message.module.css'

type MessageProps={
    message: string
    id: number
}
export const Message: React.FC<MessageProps>=(props)=>{



    return(
        <div>
        <div className={s.message}>{props.message}</div>
        </div>
    )
}
