import axios from 'axios'

const axiosRequest = axios.create({
  baseURL: 'https://backend-czw4yv9g.b4a.run/api',
  headers: { 'Content-Type': 'application/json' },
})

axiosRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      const publicPaths = ['/login', '/register', '/forgot-password']
      if (!publicPaths.includes(window.location.pathname)) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export default axiosRequest
