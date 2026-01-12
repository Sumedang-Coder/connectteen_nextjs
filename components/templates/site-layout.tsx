'use client'

import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { Header } from '../organisms/header/Header'

interface SiteLayoutProps {
  className?: string
  children?: React.ReactNode
}

const Navbar = dynamic(
  () => import('@/components/organisms/header').then((mod) => mod.Header),
  {
    loading: () => (
      <div className="fixed top-0 z-50 w-full p-4">
        <div className="h-16 w-full rounded-lg bg-white/15 backdrop-blur animate-pulse" />
      </div>
    ),
    ssr: false
  }
)

const Footer = dynamic(
  () => import('@/components/organisms/footer').then((mod) => mod.Footer),
  { ssr: false }
)

export const SiteLayout = ({ children, className }: SiteLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className={cn( className)}>
        {children}
      </main>

      <Footer />
    </div>
  )
}
