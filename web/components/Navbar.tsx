'use client'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neon-blue/20 bg-dark-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-sm font-bold" style={{boxShadow:'0 0 15px rgba(0,212,255,0.5)'}}>
              ✦
            </div>
            <span className="font-bold text-neon-blue" style={{textShadow:'0 0 10px #00d4ff'}}>
              Neo Flash Glow
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {user && (
              <>
                <Link href="/dashboard" className="text-slate-400 hover:text-neon-blue transition-colors text-sm">Dashboard</Link>
                <Link href="/timeline" className="text-slate-400 hover:text-neon-blue transition-colors text-sm">Timeline</Link>
                <Link href="/airdrop" className="text-slate-400 hover:text-neon-blue transition-colors text-sm">Airdrop</Link>
                {user.role === 'admin' && (
                  <Link href="/admin" className="text-neon-pink text-sm" style={{textShadow:'0 0 8px #ff006e'}}>Admin</Link>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <ConnectButton chainStatus="icon" showBalance={false} />
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 hidden sm:block">{user.email}</span>
                <button onClick={handleLogout} className="neo-btn-secondary text-xs py-2 px-3">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="neo-btn-secondary text-xs py-2 px-3">Login</Link>
                <Link href="/signup" className="neo-btn-primary text-xs py-2 px-3">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
