import type { ReactNode } from 'react'
import { AuthNavbar } from './AuthNavbar'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <AuthNavbar />
      <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="max-w-md w-full">{children}</div>
      </main>
    </div>
  )
}
