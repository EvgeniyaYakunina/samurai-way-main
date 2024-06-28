import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "dda441b2-5c1f-4026-aae6-ffbccdaecd79"
    }
})
