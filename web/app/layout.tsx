import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Neo Flash Glow | Farcaster Dashboard',
  description: 'Full-stack Farcaster application with Web3 wallet integration',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-900 text-slate-200 min-h-screen">
        <div className="scanline" />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
