import axios from 'axios';
//import * as axios from 'axios'; //? в видео так сказано делать

const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': '3128443d-f108-4e76-956c-6d97ad90fd1e'
        }
    }
)

export const userAPI = {
    //методы объекта userAPI:
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data) //вернем только часть респонса, т.к. компоненте не нужны все технические данные, которые вернет сервер, а нужны только полезные данные
    },
    followUser(userID: string) {
        return instance.post(`follow/${userID}`).then(response => response.data)
    },
    unfollowUser(userID: string) {
        return instance.delete(`follow/${userID}`).then(response => response.data)
    }
}
export const authAPI = {
    login(){
        return instance.get(`/auth/me`).then(response => response.data)
    }
}
export const profileAPI = {
    getProfile(userID: string){
        return instance.get(`profile/${userID}`).then(response => response.data)
    }
}