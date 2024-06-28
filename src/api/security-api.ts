import {instance} from "./api";
import {GetCaptchaResponseType} from "../types/types";

export const securityAPI={
    getCaptchaUrl(){
        return instance.get<GetCaptchaResponseType>(`security/get-captcha-url`).then(res=> res.data)
    }
}