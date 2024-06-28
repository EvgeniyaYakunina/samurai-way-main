import {BaseResponseType, MeResponseType} from "../types/types";
import {instance} from "./api";

export const authAPI ={
    authMe(){
        return instance.get<BaseResponseType<MeResponseType>>(`auth/me`).then(res=> res.data)
    },
    login(email: string, password:string, rememberMe:boolean, captcha: null | string){
        return instance.post<BaseResponseType<{userId: number}>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res=> res.data)
    },
    logout(){
        return instance.delete<BaseResponseType>(`auth/login`)
    }
}