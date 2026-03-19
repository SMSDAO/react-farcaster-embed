'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'user' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    setError('')
    const success = await signup(form.email, form.password, form.name, form.role)
    if (success) {
      router.push('/dashboard')
    } else {
      setError('Email already registered')
    }
    setLoading(false)
  }

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{background:'radial-gradient(circle, #b300ff, transparent)'}} />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{background:'radial-gradient(circle, #00ff88, transparent)'}} />

      <div className="w-full max-w-md relative z-10">
        <div className="neo-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-green-400 flex items-center justify-center text-2xl mx-auto mb-4" style={{boxShadow:'0 0 30px rgba(179,0,255,0.5)'}}>
              ⚡
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
            <p className="text-slate-500 text-sm">Join the Neo Flash Glow network</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Display Name</label>
              <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your Name" className="neo-input" required />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Email</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" className="neo-input" required />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Password</label>
              <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="Min. 6 characters" className="neo-input" required />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Confirm Password</label>
              <input type="password" value={form.confirm} onChange={e => update('confirm', e.target.value)} placeholder="Repeat password" className="neo-input" required />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Account Type</label>
              <select value={form.role} onChange={e => update('role', e.target.value)} className="neo-input" style={{appearance:'none'}}>
                <option value="user">👤 User</option>
                <option value="developer">💻 Developer</option>
              </select>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="neo-btn-primary" style={{width:'100%', display:'block', textAlign:'center'}}>
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-cyan-400 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
