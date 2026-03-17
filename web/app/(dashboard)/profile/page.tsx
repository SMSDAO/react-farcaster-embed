'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useAccount } from 'wagmi'

interface ProfileData {
  username: string
  displayName: string
  bio: string
  followers: number
  following: number
  casts: number
}

export default function ProfilePage() {
  const { user } = useAuth()
  const { address } = useAccount()
  const [fcUsername, setFcUsername] = useState('')
  const [synced, setSynced] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData | null>(null)

  const handleSync = async (e: React.FormEvent) => {
    e.preventDefault()
    setSyncing(true)
    await new Promise(r => setTimeout(r, 2000))
    setProfileData({
      username: fcUsername,
      displayName: fcUsername.charAt(0).toUpperCase() + fcUsername.slice(1),
      bio: 'Building on Farcaster 🟣',
      followers: Math.floor(Math.random() * 5000) + 100,
      following: Math.floor(Math.random() * 500) + 50,
      casts: Math.floor(Math.random() * 1000) + 10,
    })
    setSynced(true)
    setSyncing(false)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white" style={{textShadow:'0 0 15px rgba(179,0,255,0.5)'}}>
          👤 Profile Sync
        </h1>
        <p className="text-slate-400 mt-1">Sync your Farcaster profile and social graph</p>
      </div>

      {/* Current User */}
      <div className="neo-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Your Account</h2>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl bg-purple-500/20 border border-purple-500/40 text-white font-bold" style={{boxShadow:'0 0 20px rgba(179,0,255,0.3)'}}>
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-semibold">{user?.name}</p>
            <p className="text-slate-400 text-sm">{user?.email}</p>
            {address && <p className="text-cyan-400 text-xs font-mono mt-1">{address.slice(0,8)}...{address.slice(-6)}</p>}
          </div>
        </div>
      </div>

      {/* Farcaster Sync */}
      <div className="neo-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Sync Farcaster Profile</h2>
        <form onSubmit={handleSync} className="flex gap-3 mb-6">
          <input
            value={fcUsername}
            onChange={e => setFcUsername(e.target.value)}
            placeholder="Farcaster username (e.g. pugson)"
            className="neo-input flex-1"
            required
          />
          <button type="submit" disabled={syncing} className="neo-btn-primary whitespace-nowrap" style={{borderColor:'#b300ff', color:'#b300ff', boxShadow:'0 0 15px rgba(179,0,255,0.3)'}}>
            {syncing ? 'Syncing...' : 'Sync Profile'}
          </button>
        </form>

        {synced && profileData && (
          <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-lg border border-purple-500/40">
                {profileData.displayName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white">{profileData.displayName}</p>
                <p className="text-slate-400 text-sm">@{profileData.username}</p>
              </div>
              <span className="ml-auto text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-1 rounded-full">✓ Synced</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">{profileData.bio}</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: 'Followers', value: profileData.followers.toLocaleString() },
                { label: 'Following', value: profileData.following.toLocaleString() },
                { label: 'Casts', value: profileData.casts.toLocaleString() },
              ].map(s => (
                <div key={s.label} className="p-3 rounded-lg bg-dark-700/50">
                  <div className="text-lg font-bold text-purple-400" style={{textShadow:'0 0 8px #b300ff'}}>{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* One-Click Automation */}
      <div className="neo-card p-6">
        <h2 className="text-lg font-semibold text-white mb-2">⚡ One-Click Automation</h2>
        <p className="text-slate-500 text-sm mb-4">Automate your Farcaster interactions</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Auto-Sync Timeline', icon: '🔄', desc: 'Sync every 30 min' },
            { label: 'Auto-Like Similar', icon: '❤️', desc: 'Like casts matching keywords' },
            { label: 'Auto-Recast Follows', icon: '🔁', desc: 'Recast from followed channels' },
          ].map(a => (
            <div key={a.label} className="p-4 rounded-xl border border-slate-700 hover:border-cyan-400/30 transition-colors">
              <div className="text-2xl mb-2">{a.icon}</div>
              <div className="text-sm font-medium text-white mb-1">{a.label}</div>
              <div className="text-xs text-slate-500 mb-3">{a.desc}</div>
              <button className="text-xs neo-btn-secondary w-full text-center py-1.5">Enable</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
