'use client'
import { useState } from 'react'
// The react-farcaster-embed main export uses `import "server-only"` (it is a Server Component).
// We import from dist/client which is the published client-side build for use in Client Components.
import { FarcasterEmbed } from 'react-farcaster-embed/dist/client'
import 'react-farcaster-embed/dist/styles.css'

const DEMO_CASTS = [
  { id: '1', author: 'pugson', displayName: 'Wojtek', pfp: 'https://api.dicebear.com/7.x/shapes/svg?seed=pugson', text: 'react-farcaster-embed just got a major upgrade! Now with Neo Flash Glow UI. Check it out 🚀', likes: 142, recasts: 28, replies: 17, timestamp: '2h ago', hash: '0x4294c797' },
  { id: '2', author: 'vitalik.eth', displayName: 'Vitalik', pfp: 'https://api.dicebear.com/7.x/shapes/svg?seed=vitalik', text: 'Farcaster is the future of decentralized social media. The composability is incredible.', likes: 2841, recasts: 512, replies: 234, timestamp: '4h ago', hash: '0x1234abcd' },
  { id: '3', author: 'dwr.eth', displayName: 'Dan Romero', pfp: 'https://api.dicebear.com/7.x/shapes/svg?seed=dwr', text: 'We just shipped another update to Warpcast. Speed improvements across the board. Mobile too.', likes: 891, recasts: 156, replies: 89, timestamp: '6h ago', hash: '0x48d47343' },
  { id: '4', author: 'jessepollak', displayName: 'Jesse Pollak', pfp: 'https://api.dicebear.com/7.x/shapes/svg?seed=jesse', text: 'Base is home. The developer ecosystem on Base is growing faster than we ever imagined.', likes: 1204, recasts: 289, replies: 145, timestamp: '8h ago', hash: '0x5678efgh' },
]

export default function TimelinePage() {
  const [username, setUsername] = useState('')
  const [hash, setHash] = useState('')
  const [embedUrl, setEmbedUrl] = useState('')
  const [filter, setFilter] = useState('all')

  const handleEmbed = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && hash) {
      setEmbedUrl(`https://warpcast.com/${username}/${hash}`)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white" style={{textShadow:'0 0 15px rgba(0,212,255,0.5)'}}>
            📡 Farcaster Timeline
          </h1>
          <p className="text-slate-400 mt-1">Browse and embed casts from the Farcaster network</p>
        </div>
      </div>

      {/* Embed Tool */}
      <div className="neo-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Embed a Cast</h2>
        <form onSubmit={handleEmbed} className="flex flex-col sm:flex-row gap-3">
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="username (e.g. pugson)"
            className="neo-input flex-1"
          />
          <input
            value={hash}
            onChange={e => setHash(e.target.value)}
            placeholder="cast hash (e.g. 0x4294c797)"
            className="neo-input flex-1"
          />
          <button type="submit" className="neo-btn-primary whitespace-nowrap">
            Embed Cast
          </button>
        </form>
        {embedUrl && (
          <div className="mt-4">
            <p className="text-xs text-slate-500 mb-3">Embedded cast from: <span className="text-cyan-400">{embedUrl}</span></p>
            <FarcasterEmbed url={embedUrl} />
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'following', 'trending'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${filter === f ? 'neo-btn-primary' : 'neo-btn-secondary'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cast Feed */}
      <div className="space-y-4">
        {DEMO_CASTS.map(cast => (
          <div key={cast.id} className="neo-card p-5 hover:border-cyan-400/40 transition-all duration-200">
            <div className="flex items-start gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cast.pfp} alt={cast.author} className="w-10 h-10 rounded-full" style={{border:'1px solid rgba(0,212,255,0.3)'}} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white text-sm">{cast.displayName}</span>
                  <span className="text-slate-500 text-xs">@{cast.author}</span>
                  <span className="text-slate-600 text-xs ml-auto">{cast.timestamp}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{cast.text}</p>
                <div className="flex items-center gap-5 mt-3">
                  <button className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-400 transition-colors text-xs">
                    <span>💬</span><span>{cast.replies}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-slate-500 hover:text-green-400 transition-colors text-xs">
                    <span>🔁</span><span>{cast.recasts}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-slate-500 hover:text-pink-400 transition-colors text-xs">
                    <span>❤️</span><span>{cast.likes}</span>
                  </button>
                  <a href={`https://warpcast.com/${cast.author}/${cast.hash}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-cyan-400 transition-colors text-xs ml-auto">
                    View on Warpcast →
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
