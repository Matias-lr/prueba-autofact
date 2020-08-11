import axios, { Method } from 'axios'

const baseURL = 'http://127.0.0.1:8000/api'

export default (url:string, data:object | null,headers:object | null,method:Method = "get")=>axios({
    method,
    url: baseURL + url,
    data,
    headers
})