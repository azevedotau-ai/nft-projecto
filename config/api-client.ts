import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.LOCAL_API_URL,
})
