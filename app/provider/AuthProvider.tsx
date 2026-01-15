"use client"

import { useEffect } from "react"
import axios from "axios"
import { useAuthStore } from "@/app/store/useAuthStore"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    let retry = 0

    const fetchMe = () => {
      axios.get("https://connectteen-server.vercel.app/api/auth/me", {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.success) {
          setUser(res.data.user)
        }
      })
      .catch(err => {
        console.log("AUTH PROVIDER ERROR:", err)
        if (retry < 1) {          
          retry++
          setTimeout(fetchMe, 300)
        }
      })
    }

    fetchMe()
  }, [setUser])

  return <>{children}</>
}
