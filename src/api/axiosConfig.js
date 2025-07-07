import axios from 'axios'
import router from '../router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

api.interceptors.request.use(config => {
  
  config.headers['ngrok-skip-browser-warning'] = 'true'
  
  const token = localStorage.getItem('rayToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      // Token 過期或未授權才導回登入頁
      router.push('/authpage')
    }
    return Promise.reject(error)
  }
)

export default api
