'use client'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const roleColors: Record<string, string> = {
  admin: '#ff006e',
  developer: '#b300ff',
  user: '#00d4ff',
}

const roleLabels: Record<string, string> = {
  admin: '👑 Admin',
  developer: '💻 Developer',
  user: '👤 User',
}

export default function DashboardPage() {
  const { user } = useAuth()
  if (!user) return null

  const color = roleColors[user.role] || '#00d4ff'

  const stats = [
    { label: 'Casts Viewed', value: '142', icon: '📡' },
    { label: 'Profiles Synced', value: '8', icon: '🔄' },
    { label: 'Airdrops Checked', value: '24', icon: '🪂' },
    { label: 'Recasts', value: '17', icon: '🔁' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="neo-card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl" style={{background:`${color}20`, border:`1px solid ${color}40`, boxShadow:`0 0 20px ${color}30`}}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-slate-400 text-sm">{user.email}</p>
            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full" style={{color, border:`1px solid ${color}40`, background:`${color}10`}}>
              {roleLabels[user.role]}
            </span>
          </div>
          <div>
            <ConnectButton />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="neo-card p-5 text-center">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-cyan-400 mb-1" style={{textShadow:'0 0 8px #00d4ff'}}>{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/timeline', icon: '📡', title: 'Farcaster Timeline', desc: 'Browse and embed casts', color: '#00d4ff' },
            { href: '/airdrop', icon: '🪂', title: 'Airdrop Checker', desc: 'Check wallet eligibility', color: '#00ff88' },
            { href: '/profile', icon: '👤', title: 'Profile Sync', desc: 'Sync your Farcaster profile', color: '#b300ff' },
            ...(user.role === 'admin' ? [
              { href: '/admin', icon: '⚙️', title: 'Admin Panel', desc: 'Manage users and settings', color: '#ff006e' }
            ] : []),
            ...(user.role === 'developer' || user.role === 'admin' ? [
              { href: '/dashboard', icon: '📊', title: 'API Access', desc: 'Developer tools and API keys', color: '#ffee00' }
            ] : []),
          ].map(a => (
            <Link key={a.href + a.title} href={a.href} className="neo-card p-5 hover:scale-105 transition-transform duration-200 block">
              <div className="text-2xl mb-3">{a.icon}</div>
              <h3 className="font-semibold text-white mb-1" style={{textShadow:`0 0 8px ${a.color}`}}>{a.title}</h3>
              <p className="text-slate-500 text-sm">{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Role-specific content */}
      {user.role === 'admin' && (
        <div className="neo-card p-6 border-pink-500/30" style={{borderColor:'rgba(255,0,110,0.3)'}}>
          <h2 className="text-lg font-semibold mb-4" style={{color:'#ff006e', textShadow:'0 0 8px #ff006e'}}>⚠️ Admin Notice</h2>
          <p className="text-slate-400 text-sm">You have full administrative access. Default credentials are active. Please change the default admin password in the Admin panel for production use.</p>
          <Link href="/admin" className="inline-block mt-3 text-sm neo-btn-primary" style={{borderColor:'#ff006e', color:'#ff006e', boxShadow:'0 0 15px rgba(255,0,110,0.3)'}}>
            Go to Admin Panel →
          </Link>
        </div>
      )}
    </div>
  )
}
