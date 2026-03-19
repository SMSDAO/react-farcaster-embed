'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const success = await login(email, password)
    if (success) {
      router.push('/dashboard')
    } else {
      setError('Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full opacity-15 blur-3xl" style={{background:'radial-gradient(circle, #00d4ff, transparent)'}} />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full opacity-15 blur-3xl" style={{background:'radial-gradient(circle, #b300ff, transparent)'}} />

      <div className="w-full max-w-md relative z-10">
        <div className="neo-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-2xl mx-auto mb-4" style={{boxShadow:'0 0 30px rgba(0,212,255,0.5)'}}>
              ✦
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-slate-500 text-sm">Sign in to Neo Flash Glow</p>
          </div>

          {/* Demo credentials — hidden in production builds */}
          {process.env.NODE_ENV !== 'production' && (
            <div className="mb-6 p-3 rounded-lg border border-cyan-400/20 bg-cyan-400/5 text-xs text-slate-400">
              <p className="text-cyan-400 font-medium mb-1">Demo Admin Credentials:</p>
              <p>Email: <code className="text-white">admin@admin.com</code></p>
              <p>Password: <code className="text-white">admin123</code></p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="neo-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="neo-input"
                required
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="neo-btn-primary w-full text-center"
              style={{width:'100%', display:'block', textAlign:'center'}}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            No account?{' '}
            <Link href="/signup" className="text-cyan-400 hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
