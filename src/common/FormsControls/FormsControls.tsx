import s from './FormControls.module.css'

export const Textarea = ({input, meta, ...restProps}:any)=>{
    const showError = meta.touched && meta.error
    return(
        <div className={s.formControl + " " + (showError ? s.error : "")}>
            <div><textarea {...input}{...restProps}/></div>
            {showError && <span>{meta.error}</span>}
        </div>
    )
}