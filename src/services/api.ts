import { storageAuthTokenGet, storageAuthTokenSave } from '@storage/storageAuthToken';
import { AppError } from '@utils/appError'
import axios, { AxiosError, AxiosInstance } from 'axios'



type singOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (singOut : singOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.1.9:3333',
  timeout: 6000
}) as APIInstanceProps

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

let failedQueue: Array<PromiseType> = []
let isRefreshing = false

api.registerInterceptTokenManager = SignOut => {
  const interceptTokenManager  = api.interceptors.response.use(response => response, async (requestError) => {

    if(requestError?.response?.status === 401){
      if(requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid'){
        const { refresh_token } = await storageAuthTokenGet()

        if(!refresh_token){
          SignOut()
          return Promise.reject(requestError)
        }

        const originalRequestConfig = requestError.config;

        if(isRefreshing){
          return new Promise((resolve, reject) => {
            failedQueue.push({
              onSuccess: (token: string) => {
                originalRequestConfig.headers = { 'Authorization' : `Bearer ${token}`};
                resolve(api(originalRequestConfig))
              },
              onFailure: (error: AxiosError) => {
                reject(error)
              }
            })
          })
        }

        isRefreshing = true;

        return new Promise(async(resolve, reject) => {
          try {
            const { data } = await api.post('/sessions/refresh-token', {
              refresh_token
            })

            await storageAuthTokenSave({
              token: data.token,
              refresh_token: data.refresh_token
            })

            if(originalRequestConfig.data){
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
            }

            originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}`}
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

            failedQueue.forEach(request => {
              request.onSuccess(data.token)
            })

            resolve(api(originalRequestConfig))

          } catch (error: any){
            failedQueue.forEach(request => {
              request.onFailure(error)
            })
            SignOut()
            reject(error)
          } finally {
            isRefreshing = false;
            failedQueue = []
          }
        })

      }
      SignOut();

    }
    if(requestError.response && requestError.response.data){
      return Promise.reject(new AppError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}


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