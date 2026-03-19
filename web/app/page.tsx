import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen grid-bg relative overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background:'radial-gradient(circle, #00d4ff, transparent)'}} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background:'radial-gradient(circle, #b300ff, transparent)'}} />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-sm font-bold" style={{boxShadow:'0 0 15px rgba(0,212,255,0.5)'}}>
                ✦
              </div>
              <span className="font-bold text-cyan-400" style={{textShadow:'0 0 10px #00d4ff'}}>
                Neo Flash Glow
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="neo-btn-secondary text-sm">Login</Link>
              <Link href="/signup" className="neo-btn-primary text-sm">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-sm mb-8">
            <span>✦</span>
            <span>Production-Ready Farcaster Platform</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">The Future of </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff, #b300ff, #ff006e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
            }}>
              Farcaster Apps
            </span>
          </h1>

          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Connect your wallet, sync your Farcaster profile, explore timelines, check airdrops,
            and manage everything from one sleek dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/signup" className="neo-btn-primary text-base px-8 py-4 inline-block text-center">
              🚀 Launch App
            </Link>
            <Link href="/login" className="neo-btn-secondary text-base px-8 py-4 inline-block text-center">
              Sign In
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {[
              { icon: '🌐', title: 'Farcaster Timeline', desc: 'View and interact with casts from the Farcaster network in real-time', color: '#00d4ff' },
              { icon: '💼', title: 'Web3 Wallet', desc: 'Connect with RainbowKit supporting MetaMask, Coinbase, WalletConnect and more', color: '#b300ff' },
              { icon: '🪂', title: 'Airdrop Checker', desc: 'Check your eligibility for the latest crypto airdrops across multiple chains', color: '#00ff88' },
              { icon: '👤', title: 'Profile Sync', desc: 'Sync your Farcaster profile, followers, following and social graph', color: '#ff006e' },
              { icon: '⚡', title: 'One-Click Automation', desc: 'Automate likes, recasts, and profile updates with powerful tools', color: '#ffee00' },
              { icon: '🔐', title: 'Role-Based Access', desc: 'Admin, Developer, and User roles with granular permission controls', color: '#00d4ff' },
            ].map((f) => (
              <div key={f.title} className="neo-card p-6 text-left hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-white mb-2" style={{textShadow:`0 0 8px ${f.color}`}}>{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="max-w-5xl mx-auto mt-24">
          <div className="neo-card p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: 'Active Users', value: '10K+' },
                { label: 'Casts Embedded', value: '1M+' },
                { label: 'Chains Supported', value: '5+' },
                { label: 'Uptime', value: '99.9%' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-cyan-400 mb-1" style={{textShadow:'0 0 10px #00d4ff'}}>{s.value}</div>
                  <div className="text-slate-500 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 text-center text-slate-600 text-sm">
        <p>© 2024 Neo Flash Glow · Built on Farcaster · Powered by Next.js</p>
      </footer>
    </div>
  )
}
