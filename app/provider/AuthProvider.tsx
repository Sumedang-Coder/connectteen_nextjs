"use client"

import { useEffect } from "react"
import axios from "axios"
import { useAuthStore } from "@/app/store/useAuthStore"

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    axios
      .get("https://connectteen-server.vercel.app/api/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data?.user) {
          setUser(res.data.user)
        } else {
          setUser(null)
        }
      })
      .catch(() => {
        setUser(null)
      })
  }, [setUser])

  return <>{children}</>
}
