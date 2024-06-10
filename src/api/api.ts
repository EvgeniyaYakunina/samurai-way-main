import axios from "axios";
import {ProfileType} from "../redux/profile-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "dda441b2-5c1f-4026-aae6-ffbccdaecd79"
    }

})

export const usersAPI= {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },

    follow(userId: number){
        return instance.post(`follow/${userId}`, {})
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    }
}
export const profileAPI={
    getProfile(userId: number){
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number){
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string){
        return instance.put(`profile/status`,{status: status})
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
}
export const authAPI ={
    authMe(){
        return instance.get(`auth/me`)
    },
    login(email: string, password:string, rememberMe:boolean){
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout(){
        return instance.delete(`auth/login`)
    }
}