import {instance} from "./api";
import {BaseResponseType, GetItemsType} from "../types/types";

export const usersAPI= {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },
    follow(userId: number){
        return instance.post<BaseResponseType>(`follow/${userId}`, {}).then(res=> res.data)
    },
    unfollow(userId: number) {
        return instance.delete<BaseResponseType>(`follow/${userId}`).then(res=> res.data)
    }
}