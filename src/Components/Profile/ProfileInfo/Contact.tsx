import s from "./ProfileInfo.module.css";
import React from "react";

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
export const Contact = ({contactTitle, contactValue}: ContactsPropsType) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}