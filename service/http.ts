import axios from 'axios'
import { message } from 'antd'
const http = axios.create({
  baseURL: '/api',
  timeout: 5000,
  withCredentials: true,
})

http.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error) => {
    // do something with request error
    // console.log(error); // for debug
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      message.error(res.message)
      return res
    }
    else {
      return res.data
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default http
