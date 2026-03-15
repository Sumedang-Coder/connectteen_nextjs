import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://connectteen-server.vercel.app/api",
  withCredentials: true,
})

export default api
