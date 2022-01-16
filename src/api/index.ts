import { AxiosPromise } from 'axios'
import axios from '../utils/axios'

interface User {
    username: string
    uuid: string
}

interface Login {
    username: string
    password: string
}

export function userLogin(data: Login): AxiosPromise<User> {
    return axios({
        url: '/api/user/login',
        method: 'post',
        data
    })
}

export function getFriendList (params: Object) {
    return axios({
        url: 'api/user/friend-list',
        method: 'get',
        params
    })
}

