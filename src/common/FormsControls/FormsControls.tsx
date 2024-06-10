import s from './FormControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import React from "react";
import {FieldValidatorType} from "../../utils/validators";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}
const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children, ...props}) => {
    const showError = touched && error
    return (
        <div className={s.formControl + " " + (showError ? s.error : "")}>
            <div>{children}</div>
            {showError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props: WrappedFieldProps) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input}{...restProps}/></FormControl>
}

export const Input = (props: WrappedFieldProps) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}
// export const createField = (component: (props: WrappedFieldProps) => JSX.Element, type: string | null,
//                             name: string, placeholder: string | null, validate: any | null,
//                             text: string | null) => {
//     return <div>
//         <Field component={component} type={type} name={name}
//                placeholder={placeholder} validate={validate}
//         /> {text}
//     </div>
// }
export function createField<FormKeysType extends string>(
    placeholder: string | undefined,
    name: FormKeysType,
    validators: Array<FieldValidatorType>,
    component: React.FC<WrappedFieldProps>,
    props = {}, text = ""
)
{
    return <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>