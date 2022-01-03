import axios from 'axios'

axios.interceptors.response.use(response => {
    return response.data
}, err => {
    Promise.reject(err)
})

export default axios
