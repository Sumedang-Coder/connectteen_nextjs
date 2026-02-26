"use client"

import { useEffect } from "react"
import api from "@/lib/axios"
import { useAuthStore } from "@/app/store/useAuthStore"

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    api
      .get("/auth/me")
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
