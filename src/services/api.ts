import { AppError } from '@utils/appError'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.1.9:3333',
  timeout: 6000
})


api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if(error.response && error.response.data){
    return Promise.reject(new AppError(error.response.data.message))
  } else {
    Promise.reject(error)
  }
})

export { api }