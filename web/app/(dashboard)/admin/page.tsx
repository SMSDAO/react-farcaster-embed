'use client'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const MOCK_USERS = [
  { id: '1', name: 'Admin', email: 'admin@admin.com', role: 'admin', status: 'active', joined: '2024-01-01' },
  { id: '2', name: 'Alice Dev', email: 'alice@dev.com', role: 'developer', status: 'active', joined: '2024-01-15' },
  { id: '3', name: 'Bob User', email: 'bob@user.com', role: 'user', status: 'active', joined: '2024-02-01' },
  { id: '4', name: 'Charlie', email: 'charlie@test.com', role: 'user', status: 'suspended', joined: '2024-02-10' },
]

const roleColors: Record<string, string> = { admin: '#ff006e', developer: '#b300ff', user: '#00d4ff' }
const statusColors: Record<string, string> = { active: '#00ff88', suspended: '#ff006e' }

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('users')

  useEffect(() => {
    if (user && user.role !== 'admin') router.push('/dashboard')
  }, [user, router])

  if (!user || user.role !== 'admin') return null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" style={{color:'#ff006e', textShadow:'0 0 15px rgba(255,0,110,0.5)'}}>
          ⚙️ Admin Panel
        </h1>
        <p className="text-slate-400 mt-1">Manage users, roles, and system settings</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '4', icon: '👥', color: '#00d4ff' },
          { label: 'Admins', value: '1', icon: '👑', color: '#ff006e' },
          { label: 'Developers', value: '1', icon: '💻', color: '#b300ff' },
          { label: 'Active Sessions', value: '3', icon: '🟢', color: '#00ff88' },
        ].map(s => (
          <div key={s.label} className="neo-card p-5 text-center">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold mb-1" style={{color: s.color, textShadow:`0 0 8px ${s.color}`}}>{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['users', 'settings', 'logs'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${activeTab === t ? 'neo-btn-primary' : 'neo-btn-secondary'}`}>
            {t === 'users' ? '👥 Users' : t === 'settings' ? '⚙️ Settings' : '📋 Logs'}
          </button>
        ))}
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="neo-card overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white">User Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 text-xs text-slate-500 font-medium">User</th>
                  <th className="text-left p-4 text-xs text-slate-500 font-medium">Role</th>
                  <th className="text-left p-4 text-xs text-slate-500 font-medium">Status</th>
                  <th className="text-left p-4 text-xs text-slate-500 font-medium">Joined</th>
                  <th className="text-left p-4 text-xs text-slate-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_USERS.map(u => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-dark-600 border border-white/10">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">{u.name}</p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{color: roleColors[u.role], border:`1px solid ${roleColors[u.role]}40`, background:`${roleColors[u.role]}10`}}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs" style={{color: statusColors[u.status]}}>
                        ● {u.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-500">{u.joined}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="text-xs neo-btn-secondary py-1 px-2">Edit</button>
                        {u.id !== '1' && <button className="text-xs py-1 px-2 rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">Remove</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="neo-card p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white">System Settings</h2>
          {[
            { label: 'App Name', value: 'Neo Flash Glow', type: 'text' },
            { label: 'Admin Email', value: 'admin@admin.com', type: 'email' },
            { label: 'WalletConnect Project ID', value: 'YOUR_PROJECT_ID', type: 'text' },
            { label: 'Farcaster API Endpoint', value: 'https://farcaster.tv', type: 'url' },
          ].map(s => (
            <div key={s.label}>
              <label className="block text-sm text-slate-400 mb-1">{s.label}</label>
              <input type={s.type} defaultValue={s.value} className="neo-input max-w-lg" />
            </div>
          ))}
          <button className="neo-btn-primary" style={{borderColor:'#ff006e', color:'#ff006e', boxShadow:'0 0 15px rgba(255,0,110,0.3)'}}>
            Save Settings
          </button>
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === 'logs' && (
        <div className="neo-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">System Logs</h2>
          <div className="space-y-2 font-mono text-xs">
            {[
              { time: '2024-03-17 00:11:51', level: 'INFO', msg: 'Admin login: admin@admin.com' },
              { time: '2024-03-17 00:10:23', level: 'INFO', msg: 'User registered: alice@dev.com (developer)' },
              { time: '2024-03-17 00:09:15', level: 'WARN', msg: 'Failed login attempt: unknown@hacker.com' },
              { time: '2024-03-17 00:08:30', level: 'INFO', msg: 'Profile sync: pugson (Farcaster)' },
              { time: '2024-03-17 00:07:14', level: 'INFO', msg: 'Airdrop check: 0x1234...abcd' },
              { time: '2024-03-17 00:05:00', level: 'INFO', msg: 'App started on port 3000' },
            ].map((l, i) => (
              <div key={i} className="flex gap-3 py-1.5 px-3 rounded hover:bg-white/[0.02]">
                <span className="text-slate-600">{l.time}</span>
                <span className={l.level === 'WARN' ? 'text-yellow-400' : 'text-green-400'}>[{l.level}]</span>
                <span className="text-slate-400">{l.msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
