export type FieldValidatorType = (value: string) => string | undefined

export const required = (value: string)=>{
    if(value) return undefined
    return "Field is required"
}
export const maxLengthCreator = (maxLength: number)=> (value: string)=>{
    if(value.length > maxLength) return `Maxlength is ${maxLength} symbols`
    return undefined
}