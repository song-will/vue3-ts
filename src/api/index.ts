import axios from '../utils/axios'

export function userLogin (data: any) {
    return axios({
        url: '/api/user/login',
        method: 'post',
        data
    })
}

