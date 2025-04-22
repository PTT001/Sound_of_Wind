import axios from 'axios'
import router from '../router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('rayToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Token 過期或錯誤，引導回登入頁
      router.push('/authpage')
    }
    return Promise.reject(error)
  }
)

export default api
