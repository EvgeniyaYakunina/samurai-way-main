import s from './FormControls.module.css'
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import React from "react";

type FormControlPropsType={
    meta: WrappedFieldMetaProps
}
const FormControl: React.FC<FormControlPropsType> = ({meta, children, ...props})=>{
    const showError = meta.touched && meta.error
    return(
        <div className={s.formControl + " " + (showError ? s.error : "")}>
            <div>{children}</div>
            {showError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props: WrappedFieldProps)=>{
    const {input, meta, ...restProps}= props
    return <FormControl {...props}><textarea {...input}{...restProps}/></FormControl>
}

export const Input = (props: WrappedFieldProps)=>{
    const {input, meta, ...restProps}=props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}