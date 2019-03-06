import axios from 'axios'
import config from '../config/config'

const { apiEndpoint } = config

const instance = axios.create({
  baseURL: apiEndpoint
})

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN'
instance.defaults.headers.post['Content-Type'] = ''

instance.interceptors.request.use(request => {
  return request
}, error => {
  console.log(error)
  return Promise.reject(error)
})

instance.interceptors.response.use(request => {
  console.log(request)
  return request
}, error => {
  console.log(error)
  return Promise.reject(error)
})

export default instance