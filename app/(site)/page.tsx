'use client'

import { useEffect } from "react"
import { Hero } from "@/components/organisms/hero/Hero"
import { RecentPosts } from "@/components/RecentPosts"
import { Articles } from "@/components/Articles"
import { Events } from "@/components/Events"

export default function HomePage() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <>
      <Hero />
      <RecentPosts />
      <Articles />
      <Events />
    </>
  )
}
