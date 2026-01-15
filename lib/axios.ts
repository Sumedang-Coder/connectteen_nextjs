import axios from "axios"

const api = axios.create({
  baseURL: "https://connectteen-server.vercel.app/api",
  withCredentials: true, 
})

export default api
