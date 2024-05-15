import axios from "axios";
import {UserType} from "../redux/users-reducer";

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
    },
    getProfile(userId: number){
        return instance.get(`profile/${userId}`)
    }
}

export const authAPI ={
    authMe(){
        return instance.get(`auth/me`)
    }
}