import { File } from '@/api/File.ts'
import { HttpClient } from '@/api/http-client.ts'

const httpClient = new HttpClient({
  baseURL: '/api',
})

httpClient.instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const fileService = new File(httpClient)
